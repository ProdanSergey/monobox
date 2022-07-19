import styled from "styled-components";

export type AlertSize = "l" | "m" | "s";

type AlertProps = {
  size?: AlertSize;
};

const mapSize = ({ size }: AlertProps): string => {
  if (size === "l") return "18px";
  if (size === "m") return "16px";
  return "12px";
};

export const StyledAlert = styled.p.attrs<AlertProps>({
  role: "alert",
})`
  margin: 0;
  font-size: ${mapSize};
  color: tomato;
`;
