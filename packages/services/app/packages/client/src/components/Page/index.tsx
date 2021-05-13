import styled from "styled-components";
import {FadeInAnimation} from "../../styles/animations";


const Page = styled.div`
  ${FadeInAnimation};
  animation: fadeIn;
  animation-duration: 2s;
  flex: 1 0 auto;
`

export default Page;