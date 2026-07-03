import React, { JSX, useState, useEffect } from 'react';
import clsx from 'clsx';
import NextLink from 'next/link';
import { User, Heart, ShoppingCart, X, Search } from 'lucide-react';
import { ComponentProps } from '@/lib/component-props';
import { isParamEnabled } from '@/helpers/isParamEnabled';
import { useI18n } from 'next-localization';
import { useRouter } from 'next/router';
import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn/components/ui/popover';
import { PopoverClose } from '@radix-ui/react-popover';
import { DemoAccountPanel } from '@/components/demo/DemoAccountPanel';
import { MiniCart } from '../non-sitecore/MiniCart';
import { LinkField } from '@sitecore-content-sdk/nextjs';
import PreviewSearch from '../non-sitecore/search/PreviewSearch';
import { PREVIEW_WIDGET_ID } from '@/constants/search';

export type NavigationIconsProps = ComponentProps & {
  fields: {
    CheckoutPage: LinkField;
    AccountPage: LinkField;
    WishlistPage: LinkField;
  };
  params: { [key: string]: string };
};

const IconDropdown = ({
  icon,
  label,
  children,
  triggerClassName,
}: {
  icon: JSX.Element;
  label: string;
  triggerClassName?: string;
} & React.PropsWithChildren) => (
  <Popover>
    <PopoverTrigger
      className={clsx(
        'text-foreground hover:text-accent data-[state=open]:text-accent transition-colors',
        triggerClassName
      )}
      aria-label={label}
    >
      {icon}
    </PopoverTrigger>
    <PopoverContent className="flex w-xl flex-col">
      <PopoverClose className="surface-btn !text-foreground shrink-0 self-end">
        <X className="size-4" />
      </PopoverClose>
      <div className="">{children}</div>
    </PopoverContent>
  </Popover>
);

export const Default = (props: NavigationIconsProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const showWishlistIcon = !isParamEnabled(props.params.HideWishlistIcon);
  const showAccountIcon = !isParamEnabled(props.params.HideAccountIcon);
  const showCartIcon = !isParamEnabled(props.params.HideCartIcon);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  const { t } = useI18n();

  // Close search when route changes
  useEffect(() => {
    setIsSearchOpen(false);
  }, [router.asPath]);

  return (
    <>
      <div className={`component navigation-icons ${props?.params?.styles?.trimEnd()}`} id={id}>
        <div className="flex items-center gap-3 p-4 lg:gap-5 [.component.header_&]:justify-end [.component.header_&]:px-0">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="hover:text-accent text-foreground p-2 transition-colors"
          >
            <Search className="size-5" />
          </button>

          {showAccountIcon && (
            <IconDropdown icon={<User className="size-5" />} label="Account">
              <DemoAccountPanel />
            </IconDropdown>
          )}

          {showWishlistIcon && (
            <IconDropdown icon={<Heart className="size-5" />} label="Wishlist">
              <p>{t('wishlist-empty') || 'Your wishlist is empty.'}</p>
            </IconDropdown>
          )}

          {showCartIcon && (
            <IconDropdown icon={<ShoppingCart className="size-5" />} label="Cart">
              <MiniCart showWishlist={showWishlistIcon} checkoutPage={props.fields?.CheckoutPage} />
            </IconDropdown>
          )}
        </div>
      </div>
      {isSearchOpen && (
        <div className="border-border bg-background absolute top-full right-0 left-0 z-50 border-b shadow-lg">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <div className="flex items-center gap-2">
              <PreviewSearch
                rfkId={PREVIEW_WIDGET_ID}
                isOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
              />

              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-foreground-muted hover:text-foreground p-3 transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/** Bristan utility bar — Wishlist, Spares, Sign In with labels */
export const BristanUtility = (props: NavigationIconsProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const showWishlistIcon = !isParamEnabled(props.params.HideWishlistIcon);
  const showAccountIcon = !isParamEnabled(props.params.HideAccountIcon);
  const showCartIcon = !isParamEnabled(props.params.HideCartIcon);
  const { t } = useI18n();

  return (
    <div
      className={`component navigation-icons navigation-icons--bristan ${props?.params?.styles?.trimEnd()}`}
      id={id}
    >
      <ul className="bristan-utility__list">
        {showWishlistIcon && (
          <li>
            <IconDropdown
              icon={
                <>
                  <Heart className="bristan-utility__icon" />
                  <span className="bristan-utility__link">Wishlist</span>
                </>
              }
              label="Wishlist"
              triggerClassName="bristan-utility__link"
            >
              <p>{t('wishlist-empty') || 'Your wishlist is empty.'}</p>
            </IconDropdown>
          </li>
        )}

        {showCartIcon && (
          <li>
            <IconDropdown
              icon={
                <>
                  <ShoppingCart className="bristan-utility__icon" />
                  <span className="bristan-utility__link">
                    Spares <span className="bristan-utility__count">0</span>
                  </span>
                </>
              }
              label="Spares basket"
              triggerClassName="bristan-utility__link"
            >
              <MiniCart showWishlist={showWishlistIcon} checkoutPage={props.fields?.CheckoutPage} />
            </IconDropdown>
          </li>
        )}

        {showAccountIcon && (
          <li>
            <IconDropdown
              icon={
                <>
                  <User className="bristan-utility__icon" />
                  <span className="bristan-utility__link">Sign In</span>
                </>
              }
              label="Sign in"
              triggerClassName="bristan-utility__link"
            >
              <DemoAccountPanel />
            </IconDropdown>
          </li>
        )}

        <li className="bristan-utility__search-mobile">
          <NextLink href="/search" className="bristan-utility__link" aria-label="Search">
            <Search className="bristan-utility__icon" />
          </NextLink>
        </li>
      </ul>
    </div>
  );
};
