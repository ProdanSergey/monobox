import styled from "styled-components";
import { StyledButton as Button } from "../../../shared/elements/button.styled";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const StyledField = styled.div`
  margin-bottom: 8px;

  label {
    display: block;
    margin-bottom: 4px;
  }

  input {
    width: 100%;
    padding: 6px;
  }
`;

export const StyledButton = styled(Button)`
  align-self: flex-end;
`;
