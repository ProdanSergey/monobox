import styled, { css } from "styled-components";

export const StyledList = styled.ul`
  margin-top: 64px;
`;

export const StyledItem = styled.li`
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: bold;
`;

export const ButtonCSS = css`
  width: 32px;
  height: 32px;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 1000%;
  }

  path,
  rect {
    fill: rgba(0, 0, 0, 0.7);
  }
`;

export const StyledOrderIcon = styled.div`
  ${ButtonCSS};
`;

export const StyledDeleteIcon = styled.button`
  ${ButtonCSS};
  font-size: 0;
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
`;
