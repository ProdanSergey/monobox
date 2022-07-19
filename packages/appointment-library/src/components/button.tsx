import styled, { css } from "styled-components";

export const ButtonCSS = css`
  display: inline-block;
  width: fit-content;
  padding: 6px;
  border: 1px solid black;
  font-size: 1em;
`;

export const StyledButton = styled.button`
  ${ButtonCSS};
  cursor: pointer;
`;
