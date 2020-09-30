import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import wave from './assets/waves/wave.svg'
import ErrorMsg from './components/ErrorMsg';
import Routes from './routes.jsx'

const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
  }
  body{
    font-family: 'Arvo', serif;
    -webkit-scrollbar { 
      display: none; 
    }
  }
`

const App = styled.main`
  width: 100vw;
  height: 100vh;
  background-image: url(${wave});
  background-repeat: no-repeat;
  display: grid;
  grid-template-rows: 70px 0.6fr 1fr;
  grid-template-areas:
  'header'
  'login'
  'calendar';
`

export default () => {
  return (
    <>
      <GlobalStyles />

      <App>
        <ErrorMsg />

        <Routes />
      </App>
    </>
  );
}