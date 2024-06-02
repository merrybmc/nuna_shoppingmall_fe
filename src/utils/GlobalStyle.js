import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}

    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        font-family: lato;
        color: #0d0d0d;
    }

    button {
        background-color: transparent;
        border: none;
        text-align: left;
        padding: 0;
        margin: 0;
    }
`;

export default GlobalStyle;
