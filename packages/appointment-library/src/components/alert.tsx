import styled from "styled-components";

export type AlertType = "error" | "warning" | "info";
export type AlertSize = "l" | "m" | "s";

type AlertProps = {
  type?: AlertType;
  size?: AlertSize;
};

const mapSize = ({ size }: AlertProps): string => {
  if (size === "l") return "18px";
  if (size === "m") return "16px";
  return "12px";
};

const mapType = ({ type }: AlertProps): string => {
  if (type === "warning") return "goldenrod";
  if (type === "info") return "lightskyblue";

  return "tomato";
};

export const StyledAlert = styled.p.attrs<AlertProps>({
  role: "alert",
})`
  margin: 0;
  font-size: ${mapSize};
  color: ${mapType};
`;
