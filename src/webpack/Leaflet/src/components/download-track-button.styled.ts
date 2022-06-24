import styled from "styled-components";
import { ButtonCSS } from "../shared/layout/button.styled";

export const StyledButton = styled.button`
  ${ButtonCSS}
  width: 100%;
  background-color: var(--color-primary);
  cursor: pointer;
`;
