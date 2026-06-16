// Below are built-in components that are available in the app, it's recommended to keep them as is

import { BYOCWrapper, NextjsContentSdkComponent, FEaaSWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in components
import * as Title from 'src/components/title/Title';
import * as RowSplitter from 'src/components/row-splitter/RowSplitter';
import * as RichText from 'src/components/rich-text/RichText';
import * as Promo from 'src/components/promo/Promo';
import * as PartialDesignDynamicPlaceholder from 'src/components/partial-design-dynamic-placeholder/PartialDesignDynamicPlaceholder';
import * as PageContent from 'src/components/page-content/PageContent';
import * as Navigation from 'src/components/navigation/Navigation';
import * as LyveraTextBand from 'src/components/lyvera/LyveraTextBand';
import * as LyveraOurBrands from 'src/components/lyvera/LyveraOurBrands';
import * as LyveraMultiPromoSlide from 'src/components/lyvera/LyveraMultiPromoSlide';
import * as LyveraMultiPromoImageSlider from 'src/components/lyvera/LyveraMultiPromoImageSlider';
import * as LyveraHeader from 'src/components/lyvera/LyveraHeader';
import * as LyveraFooter from 'src/components/lyvera/LyveraFooter';
import * as LyveraFAQItem from 'src/components/lyvera/LyveraFAQItem';
import * as LyveraFAQ from 'src/components/lyvera/LyveraFAQ';
import * as LyveraBrandPageBody from 'src/components/lyvera/LyveraBrandPageBody';
import * as LyveraBrandLogo from 'src/components/lyvera/LyveraBrandLogo';
import * as LyveraBlogListing from 'src/components/lyvera/LyveraBlogListing';
import * as LyveraBanner from 'src/components/lyvera/LyveraBanner';
import * as LyveraArticleDetails from 'src/components/lyvera/LyveraArticleDetails';
import * as LinkList from 'src/components/link-list/LinkList';
import * as Image from 'src/components/image/Image';
import * as ContentBlock from 'src/components/content-block/ContentBlock';
import * as Container from 'src/components/container/Container';
import * as ColumnSplitter from 'src/components/column-splitter/ColumnSplitter';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCWrapper],
  ['FEaaSWrapper', FEaaSWrapper],
  ['Form', Form],
  ['Title', { ...Title }],
  ['RowSplitter', { ...RowSplitter }],
  ['RichText', { ...RichText }],
  ['Promo', { ...Promo }],
  ['PartialDesignDynamicPlaceholder', { ...PartialDesignDynamicPlaceholder }],
  ['PageContent', { ...PageContent }],
  ['Navigation', { ...Navigation, componentType: 'client' }],
  ['LyveraTextBand', { ...LyveraTextBand }],
  ['LyveraOurBrands', { ...LyveraOurBrands, componentType: 'client' }],
  ['LyveraMultiPromoSlide', { ...LyveraMultiPromoSlide }],
  ['LyveraMultiPromoImageSlider', { ...LyveraMultiPromoImageSlider, componentType: 'client' }],
  ['LyveraHeader', { ...LyveraHeader, componentType: 'client' }],
  ['LyveraFooter', { ...LyveraFooter }],
  ['LyveraFAQItem', { ...LyveraFAQItem, componentType: 'client' }],
  ['LyveraFAQ', { ...LyveraFAQ, componentType: 'client' }],
  ['LyveraBrandPageBody', { ...LyveraBrandPageBody, componentType: 'client' }],
  ['LyveraBrandLogo', { ...LyveraBrandLogo }],
  ['LyveraBlogListing', { ...LyveraBlogListing, componentType: 'client' }],
  ['LyveraBanner', { ...LyveraBanner, componentType: 'client' }],
  ['LyveraArticleDetails', { ...LyveraArticleDetails, componentType: 'client' }],
  ['LinkList', { ...LinkList }],
  ['Image', { ...Image }],
  ['ContentBlock', { ...ContentBlock }],
  ['Container', { ...Container }],
  ['ColumnSplitter', { ...ColumnSplitter }],
]);

export default componentMap;
