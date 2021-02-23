import { Icon } from '@swingby-protocol/pulsar';
import React from 'react';

import { Container, StyledTelegramButton, StyledExplorerButton } from './styled';

type Props = { items?: Array<'telegram' | 'explorer'> };

export const FancyButtons = ({ items = ['telegram', 'explorer'] }: Props) => {
  return (
    <Container>
      {items.map((it) => {
        switch (it) {
          case 'explorer':
            return (
              <StyledExplorerButton
                key="explorer"
                variant="tertiary"
                size="city"
                shape="fit"
                href="https://skybridge.info"
              >
                Explorer
              </StyledExplorerButton>
            );
          case 'telegram':
            return (
              <StyledTelegramButton
                key="telegram"
                variant="tertiary"
                size="city"
                shape="fit"
                href="https://swingby.network/telegram"
              >
                <Icon.Telegram />
                &nbsp;Telegram
              </StyledTelegramButton>
            );
          default:
            return null;
        }
      })}
    </Container>
  );
};
