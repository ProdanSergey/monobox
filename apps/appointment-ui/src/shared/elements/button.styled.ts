import styled, { css } from "styled-components";

export const ButtonCSS = css`
  display: inline-flex;
  padding: 6px;
  border: 1px solid black;
  width: fit-content;
  font-size: 1em;
`;

export const StyledButton = styled.button`
  ${ButtonCSS};
  cursor: pointer;
`;
