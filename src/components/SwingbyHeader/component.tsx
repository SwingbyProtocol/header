import { Icon } from '@swingby-protocol/pulsar';
import React, { useMemo } from 'react';

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

const getCurrentLocale = (): SupportedLocale | null => {
  try {
    const regExp = new RegExp(`^/(${SUPPORTED_LOCALES.join('|')})(/.*)?$`, 'i');
    const locale = new URL(window.location.href).pathname.match(regExp)?.[1];
    if (!locale) {
      return null;
    }

    return SUPPORTED_LOCALES.find((it) => it.toLowerCase() === locale.toLowerCase()) ?? null;
  } catch (e) {
    return null;
  }
};

const TOGGLE_ID = 'sb-header-menu-toggle';
export const DEFAULT_ITEMS: Props['items'] = [
  { render: 'Liquidity', key: 'liquidity', href: 'https://skybridge.info/pool' },
  { render: 'Farm', key: 'farm', href: 'https://farm.swingby.network' },
  { render: 'Metanodes', key: 'metanodes', href: 'https://skybridge.info/metanodes' },
];

export const Component = ({
  logoHref,
  productName,
  barItems,
  items: itemsParam = DEFAULT_ITEMS,
}: Props) => {
  const locale = getCurrentLocale();
  const items = useMemo((): typeof itemsParam => {
    if (!itemsParam) return null;
    if (!locale) return itemsParam;

    return itemsParam.map((it) => {
      if (it === DEFAULT_ITEMS[0]) {
        return { ...it, href: `https://skybridge.info/${locale}/pool` };
      }

      if (it === DEFAULT_ITEMS[1]) {
        return { ...it, href: `https://farm.swingby.network/${locale}` };
      }

      if (it === DEFAULT_ITEMS[2]) {
        return { ...it, href: `https://skybridge.info/${locale}/metanodes` };
      }

      return it;
    });
  }, [itemsParam, locale]);

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
