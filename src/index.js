import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App';
import './index.css';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const RootApp = () => (
  <BrowserRouter>
    <MuiThemeProvider>
      <App/>
    </MuiThemeProvider>
  </BrowserRouter>
);

ReactDOM.render(<RootApp />, document.getElementById('root'));
