import { IGQLTextField } from '@/types/igql';
import { ComponentParams, ComponentRendering, Image, Link, Text } from '@sitecore-content-sdk/nextjs';
import React from 'react';

interface Fields {
  data: {
    datasource: {
      children: {
        results: BestSellingItem[];
      };
      title: IGQLTextField;
      intro?: IGQLTextField;
      description?: IGQLTextField;
    };
  };
}

interface BestSellingItem {
  featureImage: { jsonValue: { value: { src: string; alt?: string } } };
  featureTitle: { jsonValue: { value: string } };
  featureDescription: { jsonValue: { value: string } };
  featureLink: { jsonValue: { value: { href: string } } };
}

type BestSellingProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

type BestSellingWrapperProps = {
  props: BestSellingProps;
  children: React.ReactNode;
};

const BestSellingWrapper = ({ props, children }: BestSellingWrapperProps) => {
  const id = props.params.RenderingIdentifier;

  return (
    <section className={`${props.params.styles}`} id={id ? id : undefined}>
      {children}
    </section>
  );
};

export const Default = (props: BestSellingProps) => {
  const results = props.fields.data.datasource.children.results;
  const sectionTitle = props.fields.data.datasource.title;
  const intro = props.fields.data.datasource.intro || props.fields.data.datasource.description;

  return (
    <BestSellingWrapper props={props}>
      <div className="cf content-body">
        <div className="gr cf">
          <div className="gc gs18">
            <div className="row6-prices">
              <h2>
                <Text field={sectionTitle.jsonValue} />
              </h2>

              {intro && (
                <div className="intro">
                  <p>
                    <Text field={intro.jsonValue} />
                  </p>
                </div>
              )}

              <div className="mosaic">
                {results.map((item, index) => {
                  const title = item.featureTitle.jsonValue;
                  const description = item.featureDescription.jsonValue;
                  const image = item.featureImage.jsonValue;
                  const link = item.featureLink.jsonValue;

                  return (
                    <div className="panel" key={index}>
                      <Link field={link}>
                        <div className="imgbox">
                          <Image field={image} loading="lazy" width={310} height={174} />
                        </div>
                        <div className="textbox">
                          <h3>
                            <Text field={title} />
                          </h3>

                          <p className="desc ellipsis" data-content={description?.value}>
                            <Text field={description} />
                          </p>

                          <p className="price">
                            <span>From £23.00</span>
                          </p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BestSellingWrapper>
  );
};

