/**
 * Generates Sitecore YAML for one Lyvera Group site (PepsiCo-style sibling under tenant).
 */
export function generateSite(ctx, siteConfig) {
  const {
    w,
    TS,
    OWNER,
    GRID,
    DEVICE,
    TENANT,
    R,
    AR,
    par,
    ownerBlock,
    T_FOLDER,
    T_STYLE_FOLDER,
    T_AVAILABLE_RENDERINGS,
    T_PARTIAL,
    T_PAGE_DESIGN,
    T_VARIANT_DEF,
    T_VARIANT,
    T_STYLE,
    F_SIGNATURE,
    F_RENDERINGS,
    F_PARTIAL_DESIGNS,
    F_TEMPLATES_MAPPING,
    F_RENDERINGS_LIST,
    F_STYLE_VALUE,
    F_ALLOWED_RENDERINGS,
    PAGE_TEMPLATE,
    COMPONENT_TEMPLATES,
    RENDERING_HOST,
    PAGE_PROMO_RENDERING,
    T_PLACEHOLDER,
    F_PLACEHOLDER_KEY,
  } = ctx;

  const {
    slug,
    serialRoot,
    ids,
    variants,
    siteMeta,
    dsItems,
    supplementalDsItems = [],
    homeSections,
    contentPages = [],
    uidPrefix,
    skipInfrastructure,
    skipPromoPresentation,
    serializePromoVariants,
    preserveDataSources,
    skipPageDesign,
    promoStyles = [],
    partialVariants,
  } = siteConfig;
  const { removePath } = ctx;
  const contentPath = `/sitecore/content/lyveragroup/${slug}`;
  const base = `${serialRoot}/${slug}`;
  const pageTemplate = ids.pageTemplate ?? PAGE_TEMPLATE;

  const writeFolder = (id, parent, pathSuffix, template = T_FOLDER) => {
    w(
      `${base}/${pathSuffix}.yml`,
      `---
ID: "${id}"
Parent: "${parent}"
Template: "${template}"
Path: ${contentPath}/${pathSuffix}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
    );
  };

  const folderTemplateFor = (pathSuffix) => {
    if (pathSuffix.startsWith('Presentation/Styles/') || pathSuffix === 'Presentation/Styles') {
      return T_STYLE_FOLDER;
    }
    if (pathSuffix.startsWith('Presentation/Headless Variants/')) {
      return T_VARIANT_DEF;
    }
    return T_FOLDER;
  };

  const writeVariant = (compName, variantName) => {
    const key = `${compName}/${variantName}`;
    const id = variants.items[key];
    const parent = variants.folders[compName];
    w(
      `${base}/Presentation/Headless Variants/${compName}/${variantName}.yml`,
      `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_VARIANT_DEF}"
Path: ${contentPath}/Presentation/Headless Variants/${compName}/${variantName}
SharedFields:
- ID: "ba1f60d6-3deb-40cc-bb61-eec772279ee1"
  Hint: __Base template
  Value: |
    {${T_VARIANT}}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
    );
  };

  const writeStyle = (id, parent, pathSuffix, cssClass, allowedRenderingIds = []) => {
    const allowed =
      allowedRenderingIds.length > 0
        ? `- ID: "${F_ALLOWED_RENDERINGS}"
  Hint: Allowed Renderings
  Value: |
    ${allowedRenderingIds.map((r) => `{${r}}`).join('\n    ')}`
        : '';

    w(
      `${base}/Presentation/Styles/${pathSuffix}.yml`,
      `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_STYLE}"
Path: ${contentPath}/Presentation/Styles/${pathSuffix}
SharedFields:
- ID: "${F_STYLE_VALUE}"
  Hint: Value
  Value: "${cssClass}"
${allowed}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
    );
  };

  if (!skipInfrastructure) {
    w(
    `${serialRoot}/${slug}.yml`,
    `---
ID: "${ids.site}"
Parent: "${TENANT}"
Template: "3a732591-325a-417b-98ad-0cf555cb26c0"
Path: ${contentPath}
SharedFields:
- ID: "85a7501a-86d9-4243-9075-0b727c3a6db4"
  Hint: Name
  Value: ${siteMeta.name}
- ID: "89cecf4f-e545-44f2-813d-272c08661d14"
  Hint: Description
  Value: ${siteMeta.description}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
${ownerBlock}
`
  );
  }

  const formatFieldValue = (value) => {
    const text = String(value);
    if (text.includes('\n')) {
      return `Value: |\n${text.split('\n').map((line) => `        ${line}`).join('\n')}`;
    }
    if (/[:#'"&*!|>@[\]{},]/.test(text) || text !== text.trim()) {
      return `Value: "${text.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
    }
    return `Value: ${text}`;
  };

  const formatImageFieldValue = (value) => {
    const src = typeof value === 'object' && value !== null ? value.src : String(value);
    const alt = typeof value === 'object' && value !== null ? value.alt ?? '' : '';
    return `Value: |
        <image mediaid="" src="${src}" alt="${alt}" />`;
  };

  const writeDataSource = ([id, itemName, templateName, fieldMap]) => {
    const templateConfig = COMPONENT_TEMPLATES[templateName];
    const renderableTemplateId = templateConfig.renderable;
    const sharedFieldLines = [];
    const languageFieldLines = [];

    for (const [hint, value] of Object.entries(fieldMap)) {
      const fieldDef = templateConfig.fields.find(([h]) => h === hint);
      if (!fieldDef) {
        throw new Error(`Unknown field "${hint}" on template ${templateName}`);
      }
      const fieldType = fieldDef[1];
      const fieldId = fieldDef[2];
      if (fieldType === 'Image') {
        sharedFieldLines.push(`- ID: "${fieldId}"
  Hint: ${hint}
  ${formatImageFieldValue(value)}`);
      } else {
        languageFieldLines.push(`    - ID: "${fieldId}"
      Hint: ${hint}
      ${formatFieldValue(value)}`);
      }
    }

    const sharedFieldsBlock =
      sharedFieldLines.length > 0 ? `SharedFields:\n${sharedFieldLines.join('\n')}\n` : '';

    w(
      `${base}/Data/${itemName}.yml`,
      `---
ID: "${id}"
Parent: "${ids.dataRoot}"
Template: "${renderableTemplateId}"
Path: ${contentPath}/Data/${itemName}
${sharedFieldsBlock}Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
${languageFieldLines.join('\n')}
`
    );
  };

  if (!preserveDataSources) {
    if (removePath) {
      removePath(`${base}/Data`);
    }
    for (const dsItem of dsItems) {
      writeDataSource(dsItem);
    }
  }

  for (const dsItem of supplementalDsItems) {
    writeDataSource(dsItem);
  }

  if (!skipInfrastructure) {
    const presentationFolders = [
      [ids.presentation, ids.site, 'Presentation'],
      [ids.partialDesigns, ids.presentation, 'Presentation/Partial Designs'],
      [ids.pageDesigns, ids.presentation, 'Presentation/Page Designs'],
      [ids.available, ids.presentation, 'Presentation/Available Renderings'],
      [ids.headlessVariants, ids.presentation, 'Presentation/Headless Variants'],
      [ids.placeholderSettings, ids.presentation, 'Presentation/Placeholder Settings'],
      [ids.stylesRoot, ids.presentation, 'Presentation/Styles'],
      [ids.settings, ids.site, 'Settings'],
      [ids.siteGroupingFolder, ids.settings, 'Settings/Site Grouping'],
      [ids.partialDesignSlotFolder, ids.placeholderSettings, 'Presentation/Placeholder Settings/Partial Design'],
      [ids.placeholderHeader, ids.placeholderSettings, 'Presentation/Placeholder Settings/headless-header'],
      [ids.placeholderMain, ids.placeholderSettings, 'Presentation/Placeholder Settings/headless-main'],
      [ids.placeholderFooter, ids.placeholderSettings, 'Presentation/Placeholder Settings/headless-footer'],
      [ids.stylesPromo, ids.stylesRoot, 'Presentation/Styles/Promo'],
      [ids.stylesBanner, ids.stylesRoot, 'Presentation/Styles/Lyvera Banner'],
      ...Object.entries(variants.folders)
        .filter(([compName]) => !(skipPromoPresentation && compName === 'Promo' && !serializePromoVariants))
        .map(([compName, id]) => [id, ids.headlessVariants, `Presentation/Headless Variants/${compName}`]),
    ];
    for (const [id, parent, pathSuffix] of presentationFolders) {
      writeFolder(id, parent, pathSuffix, folderTemplateFor(pathSuffix));
    }
  } else {
    const contentFolders = [
      ...(skipPromoPresentation ? [] : [[ids.stylesPromo, ids.stylesRoot, 'Presentation/Styles/Promo']]),
      [ids.stylesBanner, ids.stylesRoot, 'Presentation/Styles/Lyvera Banner'],
      [ids.placeholderHeader, ids.placeholderSettings, 'Presentation/Placeholder Settings/headless-header'],
      [ids.placeholderMain, ids.placeholderSettings, 'Presentation/Placeholder Settings/headless-main'],
      [ids.placeholderFooter, ids.placeholderSettings, 'Presentation/Placeholder Settings/headless-footer'],
      ...Object.entries(variants.folders)
        .filter(([compName]) => !(skipPromoPresentation && compName === 'Promo' && !serializePromoVariants))
        .map(([compName, id]) => [id, ids.headlessVariants, `Presentation/Headless Variants/${compName}`]),
    ];
    for (const [id, parent, pathSuffix] of contentFolders) {
      writeFolder(id, parent, pathSuffix, folderTemplateFor(pathSuffix));
    }
  }

  for (const key of Object.keys(variants.items)) {
    const isPromoVariant = key.startsWith('Promo/');
    if (skipPromoPresentation && isPromoVariant && !serializePromoVariants) continue;
    const [compName, variantName] = key.split('/');
    writeVariant(compName, variantName);
  }

  if (!skipPromoPresentation) {
    writeStyle(ids.stylePromoReversed, ids.stylesPromo, 'Promo/Promo Reversed', 'promo-reversed', [PAGE_PROMO_RENDERING]);
    writeStyle(ids.stylePromoOverlay, ids.stylesPromo, 'Promo/Promo overlay', 'promo-overlay', [PAGE_PROMO_RENDERING]);
    writeStyle(ids.stylePromoBgTeal, ids.stylesPromo, 'Promo/Promo bg teal', 'promo-bg-teal', [PAGE_PROMO_RENDERING]);
    writeStyle(ids.stylePromoBgCoral, ids.stylesPromo, 'Promo/Promo bg coral', 'promo-bg-coral', [PAGE_PROMO_RENDERING]);
    writeStyle(ids.stylePromoAccentCoral, ids.stylesPromo, 'Promo/Promo Accent Coral', 'accent-coral', [PAGE_PROMO_RENDERING]);
    writeStyle(ids.stylePromoHero, ids.stylesPromo, 'Promo/Promo hero', 'promo-hero', [PAGE_PROMO_RENDERING]);
  }
  for (const style of promoStyles) {
    writeStyle(style.id, ids.stylesPromo, style.path, style.cssClass, style.allowedRenderings ?? [PAGE_PROMO_RENDERING]);
  }
  writeStyle(ids.styleBannerTricolor, ids.stylesBanner, 'Lyvera Banner/Tricolor bar', 'lyvera-banner-tricolor', [
    R.Banner,
  ]);
  if (ids.styleBannerBgTeal) {
    writeStyle(ids.styleBannerBgTeal, ids.stylesBanner, 'Lyvera Banner/Bg teal', 'lyvera-banner-bg-teal', [
      R.Banner,
    ]);
  }

  const headerPar = partialVariants?.header
    ? par(variants.items[partialVariants.header], '', '')
    : GRID;
  const footerPar = partialVariants?.footer
    ? par(variants.items[partialVariants.footer], '', '')
    : GRID;

  w(
    `${base}/Presentation/Partial Designs/header.yml`,
    `---
ID: "${ids.partialHeader}"
Parent: "${ids.partialDesigns}"
Template: "${T_PARTIAL}"
Path: ${contentPath}/Presentation/Partial Designs/header
SharedFields:
- ID: "${F_SIGNATURE}"
  Hint: Signature
  Value: header
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
    <r xmlns:p="p" xmlns:s="s" p:p="1">
      <d id="${DEVICE}">
        <r uid="{${ids.partialHeaderRenderingUid}}" s:id="{${R.Header}}" s:ds="${ids.ds.header}" s:par="${headerPar}" s:ph="headless-header" />
      </d>
    </r>
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
  );

  w(
    `${base}/Presentation/Partial Designs/footer.yml`,
    `---
ID: "${ids.partialFooter}"
Parent: "${ids.partialDesigns}"
Template: "${T_PARTIAL}"
Path: ${contentPath}/Presentation/Partial Designs/footer
SharedFields:
- ID: "${F_SIGNATURE}"
  Hint: Signature
  Value: footer
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
    <r xmlns:p="p" xmlns:s="s" p:p="1">
      <d id="${DEVICE}">
        <r uid="{${ids.partialFooterRenderingUid}}" s:id="{${R.Footer}}" s:ds="${ids.ds.footer}" s:par="${footerPar}" s:ph="headless-footer" />
      </d>
    </r>
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
  );

  const writePartialDesignSlot = (slotId, name, placeholderKey) => {
    const parent = ids.partialDesignSlotFolder;
    if (!parent || !slotId) return;
    w(
      `${base}/Presentation/Placeholder Settings/Partial Design/${name}.yml`,
      `---
ID: "${slotId}"
Parent: "${parent}"
Template: "${T_PLACEHOLDER}"
Path: ${contentPath}/Presentation/Placeholder Settings/Partial Design/${name}
SharedFields:
- ID: "${F_PLACEHOLDER_KEY}"
  Hint: Placeholder Key
  Value: "${placeholderKey}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
    );
  };

  writePartialDesignSlot(ids.partialSlotHeader, 'header', 'sxa-header');
  writePartialDesignSlot(ids.partialSlotFooter, 'footer', 'sxa-footer');

  if (!skipPageDesign && ids.pageDesignDefault && ids.pageDesigns) {
    w(
      `${base}/Presentation/Page Designs/DefaultPage.yml`,
      `---
ID: "${ids.pageDesignDefault}"
Parent: "${ids.pageDesigns}"
Template: "${T_PAGE_DESIGN}"
Path: ${contentPath}/Presentation/Page Designs/DefaultPage
SharedFields:
- ID: "${F_PARTIAL_DESIGNS}"
  Hint: PartialDesigns
  Value: "${ids.partialHeader}|${ids.partialFooter}"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
    );
  }

  if (skipInfrastructure && !skipPageDesign && ids.pageDesignDefault && ids.pageDesigns) {
    w(
      `${base}/Presentation/Page Designs.yml`,
      `---
ID: "${ids.pageDesigns}"
Parent: "${ids.presentation}"
Template: "e12fd508-c4ee-4c2e-9cf5-897a58411e72"
Path: ${contentPath}/Presentation/Page Designs
SharedFields:
- ID: "${F_TEMPLATES_MAPPING}"
  Hint: TemplatesMapping
  Value: "%7b${pageTemplate}%7d%3d%257B${ids.pageDesignDefault}%257D"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
    );
  }

  if (!skipInfrastructure) {
  w(
    `${base}/Presentation/Page Designs.yml`,
    `---
ID: "${ids.pageDesigns}"
Parent: "${ids.presentation}"
Template: "${T_FOLDER}"
Path: ${contentPath}/Presentation/Page Designs
SharedFields:
- ID: "${F_TEMPLATES_MAPPING}"
  Hint: TemplatesMapping
  Value: "%7b${pageTemplate}%7d%3d%257B${ids.pageDesignDefault}%257D"
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
  );
  }

  w(
    `${base}/Presentation/Available Renderings/Lyvera.yml`,
    `---
ID: "${ids.availableRenderings}"
Parent: "${ids.available}"
Template: "${T_AVAILABLE_RENDERINGS}"
Path: ${contentPath}/Presentation/Available Renderings/Lyvera
SharedFields:
- ID: "${F_RENDERINGS_LIST}"
  Hint: Renderings
  Value: |
    {${R.Header}}
    {${R.Footer}}
    {${R.TextBand}}
    {${R.Banner}}
    {${R.OurBrands}}
    {${R.BrandLogo}}
    {${R.MultiPromoImageSlider}}
    {${R.MultiPromoSlide}}
    {${R.BrandPageBody}}
    {${R.BlogListing}}
    {${R.ArticleDetails}}
    {${R.FAQ}}
    {${R.FAQItem}}
    {${R.PageSectionNav}}
    {${R.TrustBar}}
    {${R.ExperienceFinder}}
    {${R.CategoryGridItem}}
    {${R.TabCategoryGrid}}
    {${R.PromoCardGrid}}
    {${R.FacilityChooser}}
    {${R.FacilityOption}}
    {${R.RelatedArticles}}
    {${R.RelatedArticle}}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
  );

  const resolveRenderingId = (rendering) => {
    if (rendering === 'PagePromo') return PAGE_PROMO_RENDERING;
    return R[rendering];
  };

  const buildSectionLines = (sections) =>
    sections
      .flatMap((section) => {
        const renderingId = resolveRenderingId(section.rendering);
        const dsAttr = section.ds && ids.ds[section.ds] ? ` s:ds="${ids.ds[section.ds]}"` : '';
        const variantId = variants.items[section.variant];
        const sectionPar = par(variantId, section.styles ?? '', section.renderingIdentifier ?? '');
        const mainLine = `    <r uid="{${section.uid}}" s:id="{${renderingId}}"${dsAttr} s:par="${sectionPar}" s:ph="headless-main" />`;
        const childPh = section.childPlaceholder ?? 'lyvera-faq-items-1';
        const childLines = (section.children ?? []).map((child) => {
          const childRenderingId = resolveRenderingId(child.rendering);
          const childDsAttr = child.ds && ids.ds[child.ds] ? ` s:ds="${ids.ds[child.ds]}"` : '';
          const childVariantId = variants.items[child.variant];
          const childPar = par(childVariantId, child.styles ?? '', child.renderingIdentifier ?? '');
          return `    <r uid="{${child.uid}}" s:id="{${childRenderingId}}"${childDsAttr} s:par="${childPar}" s:ph="${childPh}" />`;
        });
        return [mainLine, ...childLines];
      })
      .join('\n');

  const homeLines = buildSectionLines(homeSections);

  const homeRenderings = `<r xmlns:p="p" xmlns:s="s" p:p="1">
  <d id="${DEVICE}">
${homeLines}
  </d>
</r>`;

  const pageDesignField =
    ids.pageDesignDefault && !skipPageDesign
      ? `- ID: "24171bf1-c0e1-480e-be76-4c0a1876f916"
  Hint: Page Design
  Value: "{${ids.pageDesignDefault.toUpperCase()}}"
`
      : '';

  w(
    `${base}/Home.yml`,
    `---
ID: "${ids.home}"
Parent: "${ids.site}"
Template: "${pageTemplate}"
Path: ${contentPath}/Home
SharedFields:
${pageDesignField}- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
${homeRenderings.split('\n').map((l) => (l ? '    ' + l : l)).join('\n')}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
    - ID: "4bb9a280-e50e-437f-b977-e281bfd16210"
      Hint: Title
      Value: ${siteMeta.homeTitle}
    - ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"
      Hint: NavigationTitle
      Value: Home
`
  );

  for (const page of contentPages) {
    const itemPath = `${page.parentPath}/${page.name}`;
    const yamlPath = itemPath.replace(/\//g, '/');
    const serialFile = page.hashSerialPath
      ? `${serialRoot.split('/')[0]}/${page.hashSerialPath}`
      : `${base}/${yamlPath}`;

    if (page.isFolder) {
      writeFolder(page.id, page.parentId, yamlPath);
      continue;
    }

    const pageLines = buildSectionLines(page.sections ?? []);
    const pageRenderings =
      pageLines.length > 0
        ? `<r xmlns:p="p" xmlns:s="s" p:p="1">
  <d id="${DEVICE}">
${pageLines}
  </d>
</r>`
        : '';

    const renderingsBlock =
      pageRenderings.length > 0
        ? `SharedFields:
- ID: "${F_RENDERINGS}"
  Hint: __Renderings
  Value: |
${pageRenderings.split('\n').map((l) => (l ? '    ' + l : l)).join('\n')}
`
        : '';

    w(
      `${serialFile}.yml`,
      `---
ID: "${page.id}"
Parent: "${page.parentId}"
Template: "${pageTemplate}"
Path: ${contentPath}/${itemPath}
${renderingsBlock}Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
    - ID: "4bb9a280-e50e-437f-b977-e281bfd16210"
      Hint: Title
      Value: ${page.title ?? page.name}
    - ID: "4e0720e9-9d50-4ddc-87cf-ecd65e8e94c8"
      Hint: NavigationTitle
      Value: ${page.title ?? page.name}
`
    );
  }

  if (!skipInfrastructure) {
    w(
      `${base}/Data.yml`,
      `---
ID: "${ids.dataRoot}"
Parent: "${ids.site}"
Template: "${T_FOLDER}"
Path: ${contentPath}/Data
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
    );

    w(
      `${base}/Settings/Site Grouping/${slug}.yml`,
      `---
ID: "${ids.siteGrouping}"
Parent: "${ids.siteGroupingFolder}"
Template: "e46f3af2-39fa-4866-a157-7017c4b2a40c"
Path: ${contentPath}/Settings/Site Grouping/${slug}
SharedFields:
- ID: "1ee576af-ba8e-4312-9fbd-2ccf8395baa1"
  Hint: StartItem
  Value: "{${ids.home.toUpperCase()}}"
- ID: "85a7501a-86d9-4243-9075-0b727c3a6db4"
  Hint: Name
  Value: ${siteMeta.name}
- ID: "8e0dd914-9afb-4d45-bf8b-7ff5d6e5337e"
  Hint: HostName
  Value: *
- ID: "9eaf6dc9-b811-4cda-9edd-9697faba628a"
  Hint: POS
  Value: en=${siteMeta.name}
- ID: "cb4e9e2e-2b66-43dc-ad3f-9caf363d28d3"
  Hint: SiteName
  Value: ${siteMeta.name}
- ID: "f57099a3-526a-49f2-aebd-635453e48875"
  Hint: RenderingHost
  Value: ${RENDERING_HOST}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
`
    );
  }
}
