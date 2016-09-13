import React from 'react';
import ReactDOM from 'react-dom';
import SampleHello from './components/sample';

ReactDOM.render(
  <SampleHello userName={global.buildBoilerGlobals.userName} />,
  document.querySelector('[data-react]')
);
