import React, { PropsWithChildren } from "react";
import { GlobalStyles } from "./GlobalStyles";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <GlobalStyles />
      {children}
    </>
  );
};

export default Layout;
