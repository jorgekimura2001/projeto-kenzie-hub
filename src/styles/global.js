import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html, body{
        width: 100%;
        height: 100vh;
    }
    html, body, div, span, h1, h2, h3, h4, h5, h6, p, blockquote, a, img, ol, ul, li, form, label, article, aside, figure, figcaption, footer, header, nav, section, main, button  {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    input{
        margin: 0;
        padding: 0;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, figcaption, figure, 
    footer, header, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote{
        quotes: none;
    }
    blockquote:before, blockquote:after{
        content: '';
        content: none;
    }
`

export default GlobalStyle