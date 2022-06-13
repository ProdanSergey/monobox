import React, { useState } from "react";

import { StyledSection } from "./index.styled";

export const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <StyledSection>
      <header>
        <button onClick={() => setOpen((s) => !s)}>{open ? "Close" : "Open"}</button>
      </header>
      <div hidden={!open}>
        <span>Hello World</span>
      </div>
    </StyledSection>
  );
};
