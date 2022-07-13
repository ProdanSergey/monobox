import styled from "styled-components";
import { StyledIcon as Icon } from "./icon.styled";

export const StyledList = styled.ul`
  margin-top: 64px;
`;

export const StyledItem = styled.li`
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: bold;
  padding: 6px 0;
`;

export const StyledIcon = styled(Icon)`
  width: 24px;
  height: 24px;
  color: rgba(0, 0, 0, 0.7);
`;

export const StyledTitle = styled.span`
  padding: 0 12px;
  text-transform: capitalize;
`;

export const StyledRemoveButton = styled.button`
  font-size: 0;
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
`;
