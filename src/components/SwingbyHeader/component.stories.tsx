import React from 'react';
import { Meta } from '@storybook/react';
import { PulsarThemeProvider, PulsarGlobalStyles } from '@swingby-protocol/pulsar';

import { ThemeSwitcher } from '../ThemeSwitcher';
import { FancyButtons } from '../FancyButtons';
import { LocaleSwitcher } from '../LocaleSwitcher';

import { SwingbyHeader } from './';

const meta: Meta = {
  title: 'SwingbyHeader',
  component: SwingbyHeader,
};

export default meta;

const Common = () => (
  <>
    <PulsarGlobalStyles />
    <SwingbyHeader />
    <SwingbyHeader
      productName="Explorer"
      barItems={
        <>
          <ThemeSwitcher theme="auto" />
          <LocaleSwitcher locale="zh" locales={['en', 'zh', 'zh-TW', 'ja', 'es', 'gl']} />
        </>
      }
      items={[
        { key: 'stake', href: 'https://skybridge.info/pool', render: 'Stake and Earn BTC' },
        { key: 'metanodes', href: 'https://skybridge.info/metanodes', render: 'Metanodes' },
        { key: 'telegram-and-explorer', render: <FancyButtons items={['telegram']} /> },
      ]}
    />
    <SwingbyHeader barItems={<ThemeSwitcher theme="light" />} />
    <SwingbyHeader barItems={<ThemeSwitcher theme="dark" />} />
  </>
);

export const Light = () => (
  <PulsarThemeProvider theme="light">
    <Common />
  </PulsarThemeProvider>
);

export const Dark = () => (
  <PulsarThemeProvider theme="dark">
    <Common />
  </PulsarThemeProvider>
);
