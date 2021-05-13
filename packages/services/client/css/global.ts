import {createGlobalStyle, css} from "styled-components";

const rippleEffect = css`
  &.ripple {
    position: absolute;
    transform: scale(0);
    border-radius: 50%;
    animation: ripple 1s linear;
    background: rgba(255,255,255,0.5);
  }

  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
    
  }
`

export const GlobalStyle = createGlobalStyle`
html,
body {
  font-family: "Roboto", "Open Sans", sans-serif;
  font-size: 16px;
  color: #696969;
  padding: 0;
  margin: 0;
}
*, *::before, *::after {
  box-sizing: border-box;
}

a {
  color: inherit;
  text-decoration: none;
}

${rippleEffect};
`