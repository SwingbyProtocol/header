import { Icon } from '@swingby-protocol/pulsar';
import React from 'react';

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
  { render: 'Liquidity', key: 'about', href: 'https://skybridge.info/pool' },
  { render: 'Farm', key: 'run-metanode', href: 'https://farm.swingby.network' },
  { render: 'Metanodes', key: 'devs', href: 'https://skybridge.info/metanodes' },
];

export const Component = ({ logoHref, productName, barItems, items = DEFAULT_ITEMS }: Props) => {
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
