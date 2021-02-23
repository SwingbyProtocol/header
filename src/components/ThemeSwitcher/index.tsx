import React, { useCallback } from 'react';
import { Icon } from '@swingby-protocol/pulsar';

import { Container } from './styled';

type Theme = 'auto' | 'light' | 'dark';

type Props = { theme: Theme; onChange?: (theme: Theme) => void };

export const ThemeSwitcher = ({ theme, onChange }: Props) => {
  const change = useCallback(() => {
    onChange?.(theme === 'auto' ? 'light' : theme === 'light' ? 'dark' : 'auto');
  }, [theme, onChange]);

  return (
    <Container onClick={change}>
      {(() => {
        switch (theme) {
          case 'auto':
            return <Icon.ThemeAuto />;
          case 'dark':
            return <Icon.ThemeDark />;
          case 'light':
          default:
            return <Icon.ThemeLight />;
        }
      })()}
    </Container>
  );
};
