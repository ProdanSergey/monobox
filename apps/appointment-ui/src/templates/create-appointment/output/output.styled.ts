import styled from "styled-components";
import { Link } from "react-router-dom";

import { ButtonCSS, StyledButton } from "@monobox/appointment-frontend";

export const StyledWrapper = styled.output`
  display: flex;
  align-items: center;
`;

export const StyledCopyButton = styled(StyledButton)`
  margin-right: 6px;
`;

export const StyledNavigationLink = styled(Link)`
  ${ButtonCSS};
  margin-right: 6px;
`;

export const StyledCopiedBadge = styled.span`
  ${ButtonCSS};
  margin-right: 6px;
  background-color: deepskyblue;
`;

export const StyledUri = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
