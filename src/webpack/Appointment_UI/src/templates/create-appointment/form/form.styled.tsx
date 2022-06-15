import styled from "styled-components";
import { StyledButton as Button } from "../../../components/button.styled";

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const StyledInputLabel = styled.label`
  display: block;
  margin-bottom: 4px;
`;

export const StyledInputField = styled.input`
  flex: 1;
  margin-bottom: 8px;
  padding: 6px;
`;

export const StyledInputError = styled.span.attrs({
  role: "alert",
})`
  font-size: 12px;
  color: tomato;
`;

export const StyledButton = styled(Button)`
  margin-top: 10px;
  align-self: flex-end;
`;
