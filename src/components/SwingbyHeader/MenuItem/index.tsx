import React from 'react';
import { Testable } from '@swingby-protocol/pulsar';

import { MenuItemContainer, MenuItemAnchor } from './styled';

type Props = { children?: React.ReactNode; isActive?: boolean } & Testable &
  Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick' | 'target'>;

export const MenuItem = ({
  children,
  href,
  onClick,
  target,
  isActive = false,
  'data-testid': testId,
}: Props) => {
  return (
    <MenuItemContainer data-testid={testId}>
      {href ? (
        <MenuItemAnchor href={href} onClick={onClick} target={target} isActive={isActive}>
          {children}
        </MenuItemAnchor>
      ) : (
        children
      )}
    </MenuItemContainer>
  );
};
