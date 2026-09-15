// Below are built-in components that are available in the app, it's recommended to keep them as is

import { BYOCWrapper, NextjsContentSdkComponent, FEaaSWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in components
import * as Title from 'src/components/title/Title';
import * as StoryList from 'src/components/story-list/StoryList';
import * as StoryDetail from 'src/components/story-detail/StoryDetail';
import * as StoryBoard from 'src/components/story-board/StoryBoard';
import * as SiteSearch from 'src/components/site-search/SiteSearch';
import * as ScrunchMonitor from 'src/components/scrunch-monitor/ScrunchMonitor';
import * as RowSplitter from 'src/components/row-splitter/RowSplitter';
import * as RichText from 'src/components/rich-text/RichText';
import * as PromoGrid from 'src/components/promo-grid/PromoGrid';
import * as Promo from 'src/components/promo/Promo';
import * as PartnerPage from 'src/components/partner-page/PartnerPage';
import * as PartnerFinder from 'src/components/partner-finder/PartnerFinder';
import * as PartialDesignDynamicPlaceholder from 'src/components/partial-design-dynamic-placeholder/PartialDesignDynamicPlaceholder';
import * as PageContent from 'src/components/page-content/PageContent';
import * as Navigation from 'src/components/navigation/Navigation';
import * as MiniCms from 'src/components/mini-cms/MiniCms';
import * as LinkList from 'src/components/link-list/LinkList';
import * as Image from 'src/components/image/Image';
import * as HomeHero from 'src/components/home-hero/HomeHero';
import * as Header from 'src/components/header/Header';
import * as FundraiseGrid from 'src/components/fundraise-grid/FundraiseGrid';
import * as Footer from 'src/components/footer/Footer';
import * as EmailPreview from 'src/components/email-preview/EmailPreview';
import * as DonateSelector from 'src/components/donate-selector/DonateSelector';
import * as ContentBlock from 'src/components/content-block/ContentBlock';
import * as Container from 'src/components/container/Container';
import * as ColumnSplitter from 'src/components/column-splitter/ColumnSplitter';
import * as CampaignAction from 'src/components/campaign-action/CampaignAction';
import * as AppealPage from 'src/components/appeal-page/AppealPage';
import * as AiChatbot from 'src/components/ai-chatbot/AiChatbot';
import * as AdviceLanding from 'src/components/advice-landing/AdviceLanding';
import * as AdviceIndex from 'src/components/advice-index/AdviceIndex';
import * as AdviceArticle from 'src/components/advice-article/AdviceArticle';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCWrapper],
  ['FEaaSWrapper', FEaaSWrapper],
  ['Form', Form],
  ['Title', { ...Title }],
  ['StoryList', { ...StoryList }],
  ['StoryDetail', { ...StoryDetail, componentType: 'client' }],
  ['StoryBoard', { ...StoryBoard }],
  ['SiteSearch', { ...SiteSearch, componentType: 'client' }],
  ['ScrunchMonitor', { ...ScrunchMonitor, componentType: 'client' }],
  ['RowSplitter', { ...RowSplitter }],
  ['RichText', { ...RichText }],
  ['PromoGrid', { ...PromoGrid }],
  ['Promo', { ...Promo }],
  ['PartnerPage', { ...PartnerPage, componentType: 'client' }],
  ['PartnerFinder', { ...PartnerFinder, componentType: 'client' }],
  ['PartialDesignDynamicPlaceholder', { ...PartialDesignDynamicPlaceholder }],
  ['PageContent', { ...PageContent }],
  ['Navigation', { ...Navigation, componentType: 'client' }],
  ['MiniCms', { ...MiniCms, componentType: 'client' }],
  ['LinkList', { ...LinkList }],
  ['Image', { ...Image }],
  ['HomeHero', { ...HomeHero, componentType: 'client' }],
  ['Header', { ...Header, componentType: 'client' }],
  ['FundraiseGrid', { ...FundraiseGrid, componentType: 'client' }],
  ['Footer', { ...Footer }],
  ['EmailPreview', { ...EmailPreview }],
  ['DonateSelector', { ...DonateSelector, componentType: 'client' }],
  ['ContentBlock', { ...ContentBlock }],
  ['Container', { ...Container }],
  ['ColumnSplitter', { ...ColumnSplitter }],
  ['CampaignAction', { ...CampaignAction }],
  ['AppealPage', { ...AppealPage, componentType: 'client' }],
  ['AiChatbot', { ...AiChatbot, componentType: 'client' }],
  ['AdviceLanding', { ...AdviceLanding }],
  ['AdviceIndex', { ...AdviceIndex }],
  ['AdviceArticle', { ...AdviceArticle, componentType: 'client' }],
]);

export default componentMap;
