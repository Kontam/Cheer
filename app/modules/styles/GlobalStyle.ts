import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';
import { styleConst } from './styleConst';

const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: "Varela Round";
    src: url("/public/VarelaRound-Regular.woff2") format("woff2"),
  }

  html {
    font-size: 62.5%;
    height: 100%;
    width: 100%;
  }

  body {
    height: 100%;
    width: 100%;
  }

  /* electronはbody storybookでは*に共通スタイルを当てる */
  *, *:before, *:after, body {
    box-sizing: border-box;
    font-family: ${styleConst.commonFont}
  }

  .MuiAlert-message {
    font-size: 1.6rem;
  }
`;

export default GlobalStyle;
