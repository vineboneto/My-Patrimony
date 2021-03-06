import { createGlobalStyle } from 'styled-components'

import Archivo from '../fonts/Poppins/Poppins-Regular.ttf'
import Poppins from '../fonts/Archivo/Archivo-Regular.ttf'

export const GlobalStyles = createGlobalStyle`

    @font-face {
        font-family: "Poppins";
        src: url(${Archivo});
        font-style: normal;
    }

    @font-face {
        font-family: "Archivo";
        src: url(${Poppins});
        font-style: normal;
    }

    :root {
        font-size: 60%;
        --color-primary: #005691;
        --color-primary-dark: #004A7C;
        --color-border-input: #CCC9C9;
        --color-label-input: #808080;
        --color-page-title: #fff;
        --color-background-form: #E5E1E1;
        --color-background-footer: #F8F5F5;
        --color-legend-form: #000; 
        --color-success: #30BC35; 
        --color-danger: #FF0000;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html, body, #root {
        background-color: var(--color-background-form);
    }

    body {
        height: 100vh;
    }


    #root {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    body,
    input,
    button,
    textarea {
        font: 500 1.6rem Poppins;
        color: var(--color-text-base);
    }

    .container {
        width: 90vw;
        max-width: 700px;
    }

    @media(min-width: 700px) {
        :root {
            font-size: 62.5%;
        }
    }
`