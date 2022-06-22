import styled from "styled-components";

export const StyledSidebar = styled.aside`
  grid-area: sidebar;
  background-color: var(--color-secondary);
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

export const StyledHeader = styled.header`
  color: #fff;
  border-bottom: 2px solid gray;
`;

export const StyledHeadline = styled.h1`
  margin: 16px 0;
`;

export const StyledContent = styled.section`
  flex: 1;
`;
