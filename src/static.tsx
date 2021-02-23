import fs from 'fs';
import path from 'path';

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server'; // eslint-disable-line import/no-internal-modules
import { PulsarGlobalStyles, PulsarThemeProvider } from '@swingby-protocol/pulsar';
import { ServerStyleSheet } from 'styled-components';

import { SwingbyHeader } from '.';

const OUTPUT_FILE_PATH = path.join(__dirname, '..', 'static.html');

const sheet = new ServerStyleSheet();

const App = () => (
  <PulsarThemeProvider theme="light">
    <PulsarGlobalStyles />
    <SwingbyHeader />
  </PulsarThemeProvider>
);

try {
  renderToStaticMarkup(sheet.collectStyles(<App />));

  fs.writeFileSync(
    OUTPUT_FILE_PATH,
    renderToStaticMarkup(
      <>
        {sheet.getStyleElement()}
        <App />
      </>,
    ),
    { encoding: 'utf-8' },
  );
} finally {
  sheet.seal();
}
