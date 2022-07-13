import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const ButtonCSS = css`
  display: inline-flex;
  padding: 6px;
  border: 1px solid black;
  width: fit-content;
  font-size: 1em;
  color: buttontext;
`;

export const StyledButton = styled.button`
  ${ButtonCSS};
  cursor: pointer;
`;

export const StyledLinkButton = styled(Link)`
  ${ButtonCSS};
  text-decoration: none;
  cursor: pointer;
`;
