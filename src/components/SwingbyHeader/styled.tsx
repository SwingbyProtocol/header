import { AppLogo } from '@swingby-protocol/pulsar';
import styled from 'styled-components';
import { rem, transitions } from 'polished';

import { bigEnough } from '../../modules/styles';

export const HeaderContainer = styled.div`
  box-sizing: border-box;
  display: grid;
  width: 100vw;
  background: ${({ theme }) => theme.pulsar.color.bg.normal};
  grid-template-columns: 1fr min-content min-content 0px;
  grid-template-areas: 'logo bar-items menu items';
  align-items: center;
  justify-items: start;
  padding: 0 ${({ theme }) => rem(theme.pulsar.size.street)};
  height: ${rem(70)};
  border-bottom: 1px solid ${({ theme }) => theme.pulsar.color.border.normal};
  word-break: keep-all;
  white-space: nowrap;

  @media ${bigEnough} {
    grid-template-columns: 1fr min-content 0px min-content;
  }
`;

export const AppLogoLink = styled.a`
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledAppLogo = styled(AppLogo)`
  grid-area: logo;
  font-size: ${({ theme }) => rem(theme.pulsar.size.street)};
`;

export const BarItemsContainer = styled.div`
  grid-area: bar-items;
  display: flex;
  flex-direction: row;
  margin-right: ${({ theme }) => rem(-theme.pulsar.size.closet)};

  > * {
    margin-right: ${({ theme }) => rem(theme.pulsar.size.closet)};
  }
`;

export const MenuToggleContainer = styled.label`
  grid-area: menu;
  cursor: pointer;
  margin-left: ${({ theme }) => rem(theme.pulsar.size.closet)};

  @media ${bigEnough} {
    display: none;
  }
`;

export const MenuToggleInput = styled.input`
  position: fixed;
  left: -9999px;
  z-index: -1;
`;

export const MenuContainer = styled.ol`
  grid-area: items;
  background: ${({ theme }) => theme.pulsar.color.bg.normal};
  position: absolute;
  width: 100vw;
  top: ${rem(70)};
  left: 0;
  margin: 0;
  padding: 0;
  transform: translateY(${rem(-70)});
  opacity: 0;
  pointer-events: none;
  list-style: none;
  border-bottom: 1px solid ${({ theme }) => theme.pulsar.color.border.normal};
  ${({ theme }) => transitions(['transform', 'opacity'], theme.pulsar.duration.normal)};

  ${MenuToggleInput}:checked ~ & {
    transform: translateY(0);
    opacity: 1;
    pointer-events: all;
  }

  @media ${bigEnough} {
    height: 100%;
    transform: none;
    opacity: 1;
    pointer-events: all;
    position: static;
    width: auto;
    background: transparent;
    display: flex;
    flex-direction: row;
    border: none;
    margin-left: ${({ theme }) => rem(theme.pulsar.size.street)};

    > :not(:last-child) {
      margin-right: ${({ theme }) => rem(theme.pulsar.size.street)};
    }
  }
`;

export const Tag = styled.span`
  background: ${({ theme }) => theme.pulsar.color.primary.normal};
  color: ${({ theme }) => theme.pulsar.color.primary.text};
  padding: ${rem(2)} ${rem(4)};
  border-radius: ${rem(4)};
`;
