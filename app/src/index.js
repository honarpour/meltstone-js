import React from 'react';
import { render } from 'react-dom';
import { injectGlobal } from 'styled-components';
import App from './App';

injectGlobal`
  body, html {
    margin: 0;
    padding: 0;
    background: #fff;
    font-family: "Segoe UI", Arial, sans-serif, Helvetica, Tahoma;
    font-weight: 400;
    font-size: 12pt;
  }
`;

render(<App />, document.getElementById('app'));
