import React, { JSX } from 'react';
import Link from 'next/link';
import { User, Heart, ShoppingCart, X, Search, MapPin, Wrench, Package } from 'lucide-react';
import { ComponentProps } from '@/lib/component-props';
import { isParamEnabled } from '@/helpers/isParamEnabled';
import { useI18n } from 'next-localization';
import { LinkField } from '@sitecore-content-sdk/nextjs';
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/shadcn/components/ui/drawer';
import { MiniCart } from '../non-sitecore/MiniCart';
import { HeaderDemoAuth } from '@/components/marley/HeaderDemoAuth';

export type NavigationIconsProps = ComponentProps & {
  fields: {
    CheckoutPage: LinkField;
    AccountPage: LinkField;
    WishlistPage: LinkField;
  };
  params: { [key: string]: string };
};

const UtilityLink = ({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon?: JSX.Element;
}) => (
  <Link
    href={href}
    className="marley-header-utility__link inline-flex items-center gap-1.5 text-sm font-medium whitespace-nowrap"
  >
    {icon}
    <span className="max-sm:sr-only">{label}</span>
  </Link>
);

/** Marley.co.uk utility bar: Search, stockist, installers, samples, My Account. */
export const Marley = (props: NavigationIconsProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  return (
    <div
      className={`component navigation-icons marley-header-utility ${props?.params?.styles?.trimEnd()}`}
      id={id}
    >
      <div className="flex flex-wrap items-center justify-end gap-4 lg:gap-6 [.component.header_&]:px-0">
        <UtilityLink
          href="/search"
          label="Search"
          icon={<Search className="size-4" aria-hidden />}
        />
        <UtilityLink
          href="/find-a-stockist"
          label="Find a Stockist"
          icon={<MapPin className="size-4" aria-hidden />}
        />
        <UtilityLink
          href="/installers"
          label="Installers"
          icon={<Wrench className="size-4" aria-hidden />}
        />
        <UtilityLink
          href="/samples"
          label="Samples"
          icon={<Package className="size-4" aria-hidden />}
        />
        <HeaderDemoAuth />
      </div>
    </div>
  );
};

const IconDropdown = ({
  icon,
  label,
  children,
}: {
  icon: JSX.Element;
  label: string;
} & React.PropsWithChildren) => (
  <Drawer direction="right">
    <DrawerTrigger
      className="text-foreground hover:text-accent data-[state=open]:text-accent transition-colors"
      aria-label={label}
    >
      {icon}
    </DrawerTrigger>
    <DrawerContent className="bg-background-muted !w-xl !max-w-full py-5">
      <DrawerClose className="surface-btn !text-foreground mx-5 shrink-0 self-end">
        <X className="size-4" />
      </DrawerClose>
      {children}
    </DrawerContent>
  </Drawer>
);

export const Default = (props: NavigationIconsProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const showWishlistIcon = !isParamEnabled(props.params.HideWishlistIcon);
  const showAccountIcon = !isParamEnabled(props.params.HideAccountIcon);
  const showCartIcon = !isParamEnabled(props.params.HideCartIcon);
  const { t } = useI18n();

  if (!showWishlistIcon && !showCartIcon && showAccountIcon) {
    return <Marley {...props} />;
  }

  return (
    <div className={`component navigation-icons ${props?.params?.styles?.trimEnd()}`} id={id}>
      <div className="flex items-center gap-3 p-4 lg:gap-6 [.component.header_&]:justify-end [.component.header_&]:px-0">
        {showAccountIcon && (
          <IconDropdown icon={<User className="size-5" />} label="Account">
            <div className="mx-5 lg:mx-18">
              <h4 className="drawer-heading">My Account</h4>
              <HeaderDemoAuth />
            </div>
          </IconDropdown>
        )}

        {showWishlistIcon && (
          <IconDropdown icon={<Heart className="size-5" />} label="Wishlist">
            <div className="mx-5 lg:mx-18">
              <h4 className="drawer-heading">My Wishlist</h4>
              <p>{t('wishlist-empty') || 'Your wishlist is empty.'}</p>
            </div>
          </IconDropdown>
        )}

        {showCartIcon && (
          <IconDropdown icon={<ShoppingCart className="size-5" />} label="Cart">
            <MiniCart showWishlist={showWishlistIcon} checkoutPage={props.fields?.CheckoutPage} />
          </IconDropdown>
        )}
      </div>
    </div>
  );
};
