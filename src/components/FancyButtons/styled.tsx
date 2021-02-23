import styled from 'styled-components';
import { rem } from 'polished';
import { Button } from '@swingby-protocol/pulsar';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  > *:not(:last-child) {
    margin-right: ${({ theme }) => rem(theme.pulsar.size.closet)};
  }
`;

export const StyledTelegramButton = styled(Button)`
  justify-self: right;
  color: #36aee2;
  border-color: #36aee2;

  :active,
  :hover {
    background: #36aee2;
  }
`;

export const StyledExplorerButton = styled(Button)`
  justify-self: left;
`;
