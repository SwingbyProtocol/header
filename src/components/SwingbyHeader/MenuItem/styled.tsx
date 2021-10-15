import styled, { css } from 'styled-components';
import { rem, transitions } from 'polished';

import { bigEnough } from '../../../modules/styles';

export const MenuItemContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: ${({ theme }) => rem(theme.pulsar.size.house)} 0;

  @media ${bigEnough} {
    flex-direction: row;
    padding: 0;
  }
`;

const activeAnchor = css`
  color: ${({ theme }) => theme.pulsar.color.primary.normal};
`;

export const MenuItemAnchor = styled.a<{ isActive: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: ${({ theme }) => rem(-theme.pulsar.size.house)} 0;
  padding-left: ${({ theme }) => rem(theme.pulsar.size.street)};
  padding-right: ${({ theme }) => rem(theme.pulsar.size.street)};
  padding-top: ${({ theme }) => rem(theme.pulsar.size.house)};
  padding-bottom: ${({ theme }) => rem(theme.pulsar.size.house)};
  font-size: ${({ theme }) => rem(theme.pulsar.size.closet)};
  font-weight: 500;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  ${({ theme }) => transitions(['background'], theme.pulsar.duration.normal)};
  ${({ isActive }) => isActive && activeAnchor};

  :hover {
    background: ${({ theme }) => theme.pulsar.color.bg.hover};
  }

  @media ${bigEnough} {
    margin: 0;
    padding: 0;

    :hover {
      background: transparent;
    }
  }
`;
