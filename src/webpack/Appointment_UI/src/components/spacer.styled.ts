import styled from "styled-components";

export type SpacerSize = "l" | "m" | "s";

type SpacerProps = {
  size: SpacerSize;
};

const mapSize = ({ size }: SpacerProps): string => {
  if (size === "l") return "18px";
  if (size === "m") return "12px";
  return "6px";
};

export const StyledSpacer = styled.div<SpacerProps>`
  height: ${mapSize};
`;
