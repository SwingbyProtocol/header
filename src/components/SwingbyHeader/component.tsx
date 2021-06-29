import { Icon } from '@swingby-protocol/pulsar';
import React from 'react';

import { FancyButtons } from '../FancyButtons';

import { MenuItem } from './MenuItem';
import {
  HeaderContainer,
  AppLogoLink,
  StyledAppLogo,
  BarItemsContainer,
  MenuToggleContainer,
  MenuToggleInput,
  MenuContainer,
  Tag,
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
const DEFAULT_ITEMS: Props['items'] = [
  { render: 'What is Swingby?', key: 'about', href: 'https://swingby.network/about-swingby' },
  { render: 'Run a metanode', key: 'run-metanode', href: 'https://swingby.network/metanode' },
  { render: 'Developers', key: 'devs', href: 'https://swingby.network/developers' },
  { render: 'Affiliate Program', key: 'affiliate', href: 'https://affiliate.swingby.network' },
  {
    render: (
      <>
        Earn&nbsp;<Tag>34.8% APR</Tag>
      </>
    ),
    key: 'earn',
    href: 'https://swingby.network/earn',
  },
  { render: <FancyButtons />, key: 'telegram-and-explorer' },
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
      {!!barItems && (
        <BarItemsContainer data-testid="sb.header.bar-items">{barItems}</BarItemsContainer>
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
    </HeaderContainer>
  );
};

Component.displayName = 'SwingbyHeader';
