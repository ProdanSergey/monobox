import { FunctionComponent, PropsWithChildren } from "react";
import { StyledField, StyledLabel, StyledError } from "../../shared/layout/form.styled";
import { StyledInput } from "./text-field.styled";

export type TextFieldChange = (target: HTMLInputElement) => void;

export type TextFieldProps = PropsWithChildren<{
  label: string;
  name: string;
  value: string;
  error?: string;
  list?: string;
  onChange?: TextFieldChange;
}>;

export const TextField: FunctionComponent<TextFieldProps> = ({
  label,
  name,
  value,
  error,
  list,
  children,
  onChange,
}) => {
  return (
    <StyledField>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledInput
        id={name}
        name={name}
        type="text"
        list={list}
        value={value}
        onChange={({ target }) => onChange?.(target)}
      />
      {children}
      {error && <StyledError>{error}</StyledError>}
    </StyledField>
  );
};

export type AutocompleteOption = {
  value: string;
};

export type AutocompleteTextFieldProps = {
  options: AutocompleteOption[];
} & TextFieldProps;

export const AutocompleteTextField: FunctionComponent<AutocompleteTextFieldProps> = ({ options, name, ...props }) => {
  return (
    <TextField name={name} list={`${name}-list`} {...props}>
      <datalist id={`${name}-list`}>
        {options.map(({ value }) => (
          <option key={value} value={value}></option>
        ))}
      </datalist>
    </TextField>
  );
};
