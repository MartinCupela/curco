import styled from "styled-components";
import Page from "../../../components/Page";

export const PageRoot = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

export const PageBody = styled(Page)`
  padding: 2rem;
  width: 100%;
  display: flex; flex-direction: column; 
  align-items: center;
`