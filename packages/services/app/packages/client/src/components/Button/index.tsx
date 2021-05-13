import React, {ReactElement, ReactNode} from "react";
import {Link} from "react-router-dom";
import {ButtonTheme, DEFAULT_BUTTON_THEME} from "./themes";
import styled, {css} from "styled-components";

interface ButtonProps {
  children: ReactNode;
  theme?: ButtonTheme;
  to?: string;
  className?: string;
  disabled?: boolean;

  onClick?(event?: any): void;
}

const RawButton = ({to, children, onClick, ...props}: ButtonProps): ReactElement => {
  return (
    to
      ? <Link {...props} to={to}>{children}</Link>
      : <button {...props} onClick={e => {createRipple(e); onClick && onClick(e)}}>{children}</button>
  );
}

export const createRipple = (event: React.MouseEvent<HTMLButtonElement>): void => {
  const target = event.currentTarget;
  const existingRipples = target.getElementsByClassName("ripple");
  Array.from(existingRipples).forEach(r => r.remove());

  const circle = document.createElement("span");
  const diameter = Math.max(target.clientWidth, target.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - (target.offsetLeft + radius)}px`;
  circle.style.top = `${event.clientY - (target.offsetTop + radius)}px`;
  circle.classList.add("ripple");

  target.appendChild(circle);
}

const BUTTON_STYLE = css<ButtonProps>`
  ${({theme}) => theme
  ? css`color: ${theme.text}; background: ${theme.background};`
  : css`color: ${DEFAULT_BUTTON_THEME.text}; background: ${DEFAULT_BUTTON_THEME.background};`};
  
  ${({disabled}: ButtonProps) => disabled && css`pointer-events: none; opacity: 0.8; cursor: default;`};
  
  position: relative; 
  display: inline-flex; justify-content: center; align-items: center;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 8px 0 ${({theme}) => theme ? theme.background : DEFAULT_BUTTON_THEME.background};
  padding: 1.5rem 2rem;
  font-size: 18px;
  font-weight: 500;
  border-radius: 0.3rem;
  border: none;
  outline: none;
  
`

export const Button = styled(RawButton)`${BUTTON_STYLE}`;
