/**
 * Main App component
 */
import { Router } from "@reach/router";
import { disableSidebarForRoute } from "@topcoder/micro-frontends-navbar-app";
import React, { useLayoutEffect } from "react";

import NotFoundPage from "./components/NotFoundPage";


import "styles/global.scss";

const App = () => {
  useLayoutEffect(() => {
    disableSidebarForRoute("/onboard/*");
  }, []);

  return (
    <>
      <Router>
        <NotFoundPage path="/onboard/" />
      </Router>
    </>
  );
};

export default App;
