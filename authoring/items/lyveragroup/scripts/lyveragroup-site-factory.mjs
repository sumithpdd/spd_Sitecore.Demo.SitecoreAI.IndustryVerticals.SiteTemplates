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
  } = ctx;

  const { slug, serialRoot, ids, variants, siteMeta, dsItems, homeSections, uidPrefix, skipInfrastructure } =
    siteConfig;
  const contentPath = `/sitecore/content/lyveragroup/${slug}`;
  const base = `${serialRoot}/${slug}`;
  const pageTemplate = ids.pageTemplate ?? PAGE_TEMPLATE;

  const writeFolder = (id, parent, pathSuffix) => {
    w(
      `${base}/${pathSuffix}.yml`,
      `---
ID: "${id}"
Parent: "${parent}"
Template: "${T_FOLDER}"
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

  for (const [id, itemName, templateName, fieldMap] of dsItems) {
    const templateConfig = COMPONENT_TEMPLATES[templateName];
    const renderableTemplateId = templateConfig.renderable;
    const fieldLines = Object.entries(fieldMap)
      .map(([hint, value]) => {
        const fieldDef = templateConfig.fields.find(([h]) => h === hint);
        if (!fieldDef) {
          throw new Error(`Unknown field "${hint}" on template ${templateName}`);
        }
        const fieldId = fieldDef[2];
        return `    - ID: "${fieldId}"
      Hint: ${hint}
      Value: ${value}`;
      })
      .join('\n');
    w(
      `${base}/Data/${itemName}.yml`,
      `---
ID: "${id}"
Parent: "${ids.dataRoot}"
Template: "${renderableTemplateId}"
Path: ${contentPath}/Data/${itemName}
Languages:
- Language: en
  Versions:
  - Version: 1
    Fields:
    - ID: "25bed78c-4957-4165-998a-ca1b52f67497"
      Hint: __Created
      Value: ${TS}
${fieldLines}
`
    );
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
      [ids.partialSlotHeader, ids.placeholderSettings, 'Presentation/Placeholder Settings/Partial Design'],
      [ids.placeholderHeader, ids.placeholderSettings, 'Presentation/Placeholder Settings/headless-header'],
      [ids.placeholderMain, ids.placeholderSettings, 'Presentation/Placeholder Settings/headless-main'],
      [ids.placeholderFooter, ids.placeholderSettings, 'Presentation/Placeholder Settings/headless-footer'],
      [ids.stylesPromo, ids.stylesRoot, 'Presentation/Styles/Lyvera Promo'],
      [ids.stylesBanner, ids.stylesRoot, 'Presentation/Styles/Lyvera Banner'],
      ...Object.entries(variants.folders).map(([compName, id]) => [
        id,
        ids.headlessVariants,
        `Presentation/Headless Variants/${compName}`,
      ]),
    ];
    for (const [id, parent, pathSuffix] of presentationFolders) {
      writeFolder(id, parent, pathSuffix);
    }
  } else {
    const contentFolders = [
      [ids.stylesPromo, ids.stylesRoot, 'Presentation/Styles/Lyvera Promo'],
      [ids.stylesBanner, ids.stylesRoot, 'Presentation/Styles/Lyvera Banner'],
      [ids.placeholderHeader, ids.placeholderSettings, 'Presentation/Placeholder Settings/headless-header'],
      [ids.placeholderMain, ids.placeholderSettings, 'Presentation/Placeholder Settings/headless-main'],
      [ids.placeholderFooter, ids.placeholderSettings, 'Presentation/Placeholder Settings/headless-footer'],
      ...Object.entries(variants.folders).map(([compName, id]) => [
        id,
        ids.headlessVariants,
        `Presentation/Headless Variants/${compName}`,
      ]),
    ];
    for (const [id, parent, pathSuffix] of contentFolders) {
      writeFolder(id, parent, pathSuffix);
    }
  }

  for (const key of Object.keys(variants.items)) {
    const [compName, variantName] = key.split('/');
    writeVariant(compName, variantName);
  }

  writeStyle(ids.styleTeal, ids.stylesPromo, 'Lyvera Promo/Teal background', 'lyvera-bg-teal', [R.Promo]);
  writeStyle(ids.styleCoral, ids.stylesPromo, 'Lyvera Promo/Coral background', 'lyvera-bg-coral', [R.Promo]);
  writeStyle(ids.styleMint, ids.stylesPromo, 'Lyvera Promo/Mint background', 'lyvera-bg-mint', [R.Promo]);
  writeStyle(ids.styleBannerTricolor, ids.stylesBanner, 'Lyvera Banner/Tricolor bar', 'lyvera-banner-tricolor', [
    R.Banner,
  ]);

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
        <r uid="{${ids.partialHeaderRenderingUid}}" s:id="{${R.Header}}" s:ds="${ids.ds.header}" s:par="${GRID}" s:ph="headless-header" />
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
        <r uid="{${ids.partialFooterRenderingUid}}" s:id="{${R.Footer}}" s:ds="${ids.ds.footer}" s:par="${GRID}" s:ph="headless-footer" />
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

  if (!skipInfrastructure) {
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
Template: "${T_FOLDER}"
Path: ${contentPath}/Presentation/Available Renderings/Lyvera
SharedFields:
- ID: "${F_RENDERINGS_LIST}"
  Hint: Renderings
  Value: |
    {${R.Header}}
    {${R.Footer}}
    {${R.TextBand}}
    {${R.Banner}}
    {${R.Promo}}
    {${R.OurBrands}}
    {${R.BrandLogo}}
    {${R.MultiPromoImageSlider}}
    {${R.MultiPromoSlide}}
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

  const homeLines = homeSections
    .map((section) => {
      const renderingId = R[section.rendering];
      const dsId = ids.ds[section.ds];
      const variantId = variants.items[section.variant];
      const sectionPar = par(variantId, section.styles ?? '');
      return `    <r uid="{${section.uid}}" s:id="{${renderingId}}" s:ds="${dsId}" s:par="${sectionPar}" s:ph="headless-main" />`;
    })
    .join('\n');

  const homeRenderings = `<r xmlns:p="p" xmlns:s="s" p:p="1">
  <d id="${DEVICE}">
${homeLines}
  </d>
</r>`;

  w(
    `${base}/Home.yml`,
    `---
ID: "${ids.home}"
Parent: "${ids.site}"
Template: "${pageTemplate}"
Path: ${contentPath}/Home
SharedFields:
- ID: "${F_RENDERINGS}"
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
