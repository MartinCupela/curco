import styled from "styled-components";
import React from "react";

const ErrorTextRoot = styled.div`
  color: #dc004e;
  font-size: 12px;
`
interface ErrorTextProps {
  msg?: string;
}

export const ErrorText = ({msg}: ErrorTextProps) => (
  <ErrorTextRoot>{msg || "\u200B"}</ErrorTextRoot>
)

