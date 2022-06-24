import styled from "styled-components";

type StyledIconProps = {
  "data-test-id"?: string;
};

export const StyledIcon = styled.div<StyledIconProps>`
  width: 48px;
  height: 48px;

  svg {
    width: 100%;
    height: 100%;
    color: inherit;
  }

  path {
    fill: currentColor;
  }

  rect {
    fill: currentColor;
  }
`;
