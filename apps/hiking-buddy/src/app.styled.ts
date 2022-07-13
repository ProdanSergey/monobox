import styled from "styled-components";

export const StyledGrid = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 30% 1fr;
  grid-template-areas: "sidebar content";
`;

export const StyledSidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
