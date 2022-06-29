import styled, { css } from "styled-components";

export const StyledForm = styled.form`
  max-width: 450px;
  padding: 16px;
`;

export const StyledField = styled.div`
  position: relative;
  margin-bottom: 6px;
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 4px;
`;

export const InputCSS = css`
  width: 100%;
  border-radius: 6px;
  border: 1px solid darkgrey;
  padding: 6px;
  font: inherit;
`;

type StyledErrorProps = {
  type?: "required" | "error" | "info";
};

const mapErrorType = ({ type }: StyledErrorProps): string => {
  if (type === "required") return "yellow";
  if (type === "info") return "lightblue";
  return "red";
};

export const StyledError = styled.span.attrs<StyledErrorProps>({
  role: "alert",
})`
  display: block;
  color: ${mapErrorType};
  margin-top: 4px;
`;
