import React from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import * as app from '../components';
import theme from './theme';

import './css/scrollbar.css';
import 'exograph/dist/css/flex.css';
import 'exograph/dist/css/additive.css';
import 'exograph/dist/css/exograph.css';
import 'exograph/dist/css/menu.css';
import 'exograph/dist/css/accordion.css';

import createStore from '../store';
import UrqlContext from './urqlContext';

const store = createStore();

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <UrqlContext>
        <app.Wrapper>
          <app.Header />
          <app.Dashboard />
          <ToastContainer />
        </app.Wrapper>
      </UrqlContext>
    </Provider>
  </MuiThemeProvider>
);

export default App;
