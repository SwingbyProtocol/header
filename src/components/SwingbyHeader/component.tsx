import { Icon } from '@swingby-protocol/pulsar';
import React, { useEffect, useMemo, useState } from 'react';

import { SupportedLocale, SUPPORTED_LOCALES } from '../LocaleSwitcher';

import { MenuItem } from './MenuItem';
import {
  HeaderContainer,
  AppLogoLink,
  StyledAppLogo,
  BarItemsContainer,
  MenuToggleContainer,
  MenuToggleInput,
  MenuContainer,
} from './styled';

type Props = {
  productName?: string;
  logoHref?: string;
  barItems?: React.ReactNode;
  items?: Array<
    { render: React.ReactNode; key: string } & Pick<
      React.ComponentPropsWithoutRef<typeof MenuItem>,
      'onClick' | 'target' | 'href'
    >
  > | null;
};

const TOGGLE_ID = 'sb-header-menu-toggle';
export const DEFAULT_ITEMS: Props['items'] = [
  { render: 'Swap', key: 'swap', href: 'https://app.swingby.network' },
  { render: 'Liquidity', key: 'liquidity', href: 'https://app.swingby.network/liquidity' },
  { render: 'Explorer', key: 'explorer', href: 'https://app.swingby.network/explorer' },
  { render: 'Metanodes', key: 'metanodes', href: 'https://app.swingby.network/metanodes' },
  { render: 'DAO', key: 'dao', href: 'https://dao.swingby.network/' },
];

export const Component = ({
  logoHref,
  productName,
  barItems,
  items: itemsParam = DEFAULT_ITEMS,
}: Props) => {
  const [href, setHref] = useState<string | null>(
    (() => {
      try {
        return window.location.href;
      } catch (e) {
        return null;
      }
    })(),
  );

  const locale = useMemo((): SupportedLocale | null => {
    try {
      if (!href) {
        return null;
      }

      const regExp = new RegExp(`^/(${SUPPORTED_LOCALES.join('|')})(/.*)?$`, 'i');
      const locale = new URL(href).pathname.match(regExp)?.[1];
      if (!locale) {
        return null;
      }

      return SUPPORTED_LOCALES.find((it) => it.toLowerCase() === locale.toLowerCase()) ?? null;
    } catch (e) {
      return null;
    }
  }, [href]);

  const items = useMemo((): typeof itemsParam => {
    if (!itemsParam) return null;
    if (!locale) return itemsParam;

    return itemsParam.map((it) => {
      if (it === DEFAULT_ITEMS[0]) {
        return { ...it, href: `https://app.swingby.network/${locale}` };
      }

      if (it === DEFAULT_ITEMS[1]) {
        return { ...it, href: `https://app.swingby.network/${locale}/liquidity` };
      }

      if (it === DEFAULT_ITEMS[2]) {
        return { ...it, href: `https://app.swingby.network/${locale}/explorer` };
      }

      if (it === DEFAULT_ITEMS[3]) {
        return { ...it, href: `https://app.swingby.network/${locale}/metanodes` };
      }

      if (it === DEFAULT_ITEMS[4]) {
        return { ...it, href: `https://dao.swingby.network/${locale}` };
      }

      return it;
    });
  }, [itemsParam, locale]);

  const currentItem = useMemo(() => {
    if (!href) return null;
    if (!items) return null;
    const results = items
      .filter((it) => {
        if (!it.href) return false;
        return href.toLowerCase().startsWith(it.href.toLowerCase());
      })
      .sort((a, b) => b.href!.length - a.href!.length);

    return results[0] ?? null;
  }, [href, items]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const body = document.querySelector('body');
    if (!body) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        setHref(document.location.href);
      });
    });

    observer.observe(body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <HeaderContainer>
      {logoHref ? (
        <AppLogoLink href={logoHref}>
          <StyledAppLogo productName={productName} data-testid="sb.header.logo" />
        </AppLogoLink>
      ) : (
        <StyledAppLogo productName={productName} data-testid="sb.header.logo" />
      )}

      {!!items && items.length > 0 && (
        <>
          <MenuToggleInput type="checkbox" id={TOGGLE_ID} />
          <MenuToggleContainer htmlFor={TOGGLE_ID} data-testid="sb.header.toggle">
            <Icon.Hamburger />
          </MenuToggleContainer>
          <MenuContainer>
            {items.map((it) => (
              <MenuItem
                key={it.key}
                href={it.href}
                target={it.target}
                onClick={it.onClick}
                data-testid={`sb.header.items.${it.key}`}
                isActive={!!currentItem && currentItem.href === it.href}
              >
                {it.render}
              </MenuItem>
            ))}
          </MenuContainer>
        </>
      )}

      {!!barItems && (
        <BarItemsContainer data-testid="sb.header.bar-items">{barItems}</BarItemsContainer>
      )}
    </HeaderContainer>
  );
};

Component.displayName = 'SwingbyHeader';
