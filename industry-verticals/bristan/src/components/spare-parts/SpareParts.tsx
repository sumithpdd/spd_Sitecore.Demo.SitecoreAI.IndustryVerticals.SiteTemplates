import React, { JSX } from 'react';
import {
  Image,
  Link,
  RichText,
  Text,
  useSitecore,
  ImageField,
  LinkField,
  RichTextField,
  Field,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { IGQLTextField } from '@/types/igql';

interface SparePartRow {
  id: string;
  partName?: { jsonValue: Field<string> };
  partNumber?: { jsonValue: Field<string> };
  diagramNumber?: { jsonValue: Field<string> };
  partPrice?: { jsonValue: Field<string> };
  buttonText?: { jsonValue: Field<string> };
}

interface SparePartsFields {
  data: {
    datasource?: {
      title?: IGQLTextField;
      introduction?: { jsonValue: RichTextField };
      dispatchNote?: IGQLTextField;
      diagramImage?: { jsonValue: ImageField };
      diagramLink?: { jsonValue: LinkField };
      helpTitle?: IGQLTextField;
      helpDescription?: IGQLTextField;
      helpLink?: { jsonValue: LinkField };
      children?: {
        results: SparePartRow[];
      };
    };
  };
}

export type SparePartsProps = ComponentProps & {
  fields: SparePartsFields;
};

export const Default = (props: SparePartsProps): JSX.Element => {
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id } = props.params;
  const isEditing = page.mode.isEditing;
  const datasource = props.fields?.data?.datasource;
  const parts = datasource?.children?.results ?? [];

  if (!datasource && !isEditing) {
    return <></>;
  }

  const diagramImage = datasource?.diagramImage?.jsonValue;
  const diagramLink = datasource?.diagramLink?.jsonValue;

  return (
    <section
      className={`component spare-parts-section ${styles ?? ''}`.trim()}
      id={id || undefined}
    >
      <div className="container">
        <div id="Spares" className="spare-parts-section__header">
          <div className="spare-parts-section__title-wrap">
            <h2 className="spare-parts-section__title">
              <Text field={datasource?.title?.jsonValue} />
            </h2>
            <span className="spare-parts-section__title-border" aria-hidden />
          </div>

          <div className="spare-parts-section__intro">
            <RichText field={datasource?.introduction?.jsonValue} />
          </div>

          <p className="spare-parts-section__dispatch">
            <Text field={datasource?.dispatchNote?.jsonValue} />
          </p>
        </div>

        <div className="spare-parts-section__layout">
          <div className="spare-parts-section__diagram">
            {(diagramImage?.value?.src || isEditing) && (
              <div className="spare-parts-section__diagram-frame">
                <Image field={diagramImage} className="spare-parts-section__diagram-image" />
              </div>
            )}
            {diagramLink?.value?.href && (
              <Link field={diagramLink} className="spare-parts-section__diagram-link" />
            )}
          </div>

          <div className="spare-parts-section__table-wrap">
            <div className="spare-parts-section__table" role="table" aria-label="Spare parts">
              <div className="spare-parts-section__table-head" role="row">
                <span role="columnheader" className="spare-parts-section__col-action" />
                <span role="columnheader">Part name</span>
                <span role="columnheader">Part number</span>
                <span role="columnheader">Diagram #</span>
                <span role="columnheader">Price</span>
              </div>

              {parts.map((part) => (
                <div className="spare-parts-section__table-row" role="row" key={part.id}>
                  <div className="spare-parts-section__col-action" role="cell">
                    <button type="button" className="spare-parts-section__add-btn">
                      <Text field={part.buttonText?.jsonValue} />
                    </button>
                  </div>
                  <div role="cell">
                    <Text field={part.partName?.jsonValue} />
                  </div>
                  <div role="cell">
                    <Text field={part.partNumber?.jsonValue} />
                  </div>
                  <div role="cell">
                    <Text field={part.diagramNumber?.jsonValue} />
                  </div>
                  <div role="cell">
                    <Text field={part.partPrice?.jsonValue} />
                  </div>
                </div>
              ))}

              {parts.length === 0 && isEditing && (
                <p className="spare-parts-section__empty">
                  Add spare part items to this datasource.
                </p>
              )}
            </div>

            <div className="spare-parts-section__help">
              <h3 className="spare-parts-section__help-title">
                <Text field={datasource?.helpTitle?.jsonValue} />
              </h3>
              <p className="spare-parts-section__help-text">
                <Text field={datasource?.helpDescription?.jsonValue} />
              </p>
              {datasource?.helpLink?.jsonValue?.value?.href && (
                <Link
                  field={datasource.helpLink.jsonValue}
                  className="spare-parts-section__help-link"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
