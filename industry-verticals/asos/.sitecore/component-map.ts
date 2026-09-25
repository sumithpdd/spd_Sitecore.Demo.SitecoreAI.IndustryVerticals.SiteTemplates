// Below are built-in components that are available in the app, it's recommended to keep them as is

import { BYOCWrapper, NextjsContentSdkComponent, FEaaSWrapper } from '@sitecore-content-sdk/nextjs';
import { Form } from '@sitecore-content-sdk/nextjs';

// end of built-in components
import * as TrendingChips from 'src/components/trending-chips/TrendingChips';
import * as Title from 'src/components/title/Title';
import * as ThemeEditor from 'src/components/theme-editor/ThemeEditor';
import * as StyleFeed from 'src/components/style-feed/StyleFeed';
import * as SocialFollow from 'src/components/social-follow/SocialFollow';
import * as SocialFeed from 'src/components/social-feed/SocialFeed';
import * as SelectedProducts from 'src/components/selected-products/SelectedProducts';
import * as SectionWrapper from 'src/components/section-wrapper/SectionWrapper';
import * as SavedItems from 'src/components/saved-items/SavedItems';
import * as RowSplitter from 'src/components/row-splitter/RowSplitter';
import * as RichText from 'src/components/rich-text/RichText';
import * as Promo from 'src/components/promo/Promo';
import * as ProductPage from 'src/components/product-page/ProductPage';
import * as ProductListing from 'src/components/product-listing/ProductListing';
import * as ProductDetails from 'src/components/product-details/ProductDetails';
import * as PersonalisedRail from 'src/components/personalised-rail/PersonalisedRail';
import * as PartialDesignDynamicPlaceholder from 'src/components/partial-design-dynamic-placeholder/PartialDesignDynamicPlaceholder';
import * as PageHeader from 'src/components/page-header/PageHeader';
import * as PageContent from 'src/components/page-content/PageContent';
import * as Offers from 'src/components/offers/Offers';
import * as NavigationIcons from 'src/components/navigation-icons/NavigationIcons';
import * as Navigation from 'src/components/navigation/Navigation';
import * as MyEdit from 'src/components/my-edit/MyEdit';
import * as LinkList from 'src/components/link-list/LinkList';
import * as LanguageSwitcher from 'src/components/language-switcher/LanguageSwitcher';
import * as Image from 'src/components/image/Image';
import * as HomeLanding from 'src/components/home-landing/HomeLanding';
import * as HeroBanner from 'src/components/hero-banner/HeroBanner';
import * as Header from 'src/components/header/Header';
import * as GenderLanding from 'src/components/gender-landing/GenderLanding';
import * as Footer from 'src/components/footer/Footer';
import * as Features from 'src/components/features/Features';
import * as EditHero from 'src/components/edit-hero/EditHero';
import * as EditCarousel from 'src/components/edit-carousel/EditCarousel';
import * as CurationInsight from 'src/components/curation-insight/CurationInsight';
import * as ContentBlock from 'src/components/content-block/ContentBlock';
import * as Container from 'src/components/container/Container';
import * as ColumnSplitter from 'src/components/column-splitter/ColumnSplitter';
import * as CategoryListing from 'src/components/category-listing/CategoryListing';
import * as BagCheckout from 'src/components/bag-checkout/BagCheckout';
import * as AccountSignIn from 'src/components/account-sign-in/AccountSignIn';

export const componentMap = new Map<string, NextjsContentSdkComponent>([
  ['BYOCWrapper', BYOCWrapper],
  ['FEaaSWrapper', FEaaSWrapper],
  ['Form', Form],
  ['TrendingChips', { ...TrendingChips, componentType: 'client' }],
  ['Title', { ...Title }],
  ['ThemeEditor', { ...ThemeEditor }],
  ['StyleFeed', { ...StyleFeed, componentType: 'client' }],
  ['SocialFollow', { ...SocialFollow }],
  ['SocialFeed', { ...SocialFeed }],
  ['SelectedProducts', { ...SelectedProducts }],
  ['SectionWrapper', { ...SectionWrapper }],
  ['SavedItems', { ...SavedItems, componentType: 'client' }],
  ['RowSplitter', { ...RowSplitter }],
  ['RichText', { ...RichText }],
  ['Promo', { ...Promo }],
  ['ProductPage', { ...ProductPage, componentType: 'client' }],
  ['ProductListing', { ...ProductListing }],
  ['ProductDetails', { ...ProductDetails }],
  ['PersonalisedRail', { ...PersonalisedRail, componentType: 'client' }],
  ['PartialDesignDynamicPlaceholder', { ...PartialDesignDynamicPlaceholder }],
  ['PageHeader', { ...PageHeader }],
  ['PageContent', { ...PageContent }],
  ['Offers', { ...Offers }],
  ['NavigationIcons', { ...NavigationIcons }],
  ['Navigation', { ...Navigation, componentType: 'client' }],
  ['MyEdit', { ...MyEdit, componentType: 'client' }],
  ['LinkList', { ...LinkList }],
  ['LanguageSwitcher', { ...LanguageSwitcher, componentType: 'client' }],
  ['Image', { ...Image }],
  ['HomeLanding', { ...HomeLanding, componentType: 'client' }],
  ['HeroBanner', { ...HeroBanner }],
  ['Header', { ...Header, componentType: 'client' }],
  ['GenderLanding', { ...GenderLanding, componentType: 'client' }],
  ['Footer', { ...Footer, componentType: 'client' }],
  ['Features', { ...Features }],
  ['EditHero', { ...EditHero }],
  ['EditCarousel', { ...EditCarousel, componentType: 'client' }],
  ['CurationInsight', { ...CurationInsight, componentType: 'client' }],
  ['ContentBlock', { ...ContentBlock }],
  ['Container', { ...Container }],
  ['ColumnSplitter', { ...ColumnSplitter }],
  ['CategoryListing', { ...CategoryListing, componentType: 'client' }],
  ['BagCheckout', { ...BagCheckout, componentType: 'client' }],
  ['AccountSignIn', { ...AccountSignIn, componentType: 'client' }],
]);

export default componentMap;
