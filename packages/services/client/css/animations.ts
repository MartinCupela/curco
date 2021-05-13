import {css} from "styled-components";

export const FadeInAnimation = css`
  @keyframes fadeIn {
    0% {opacity: 0}
    100% {opacity: 1}
  }
  animation-timing-function: ease-out;
`