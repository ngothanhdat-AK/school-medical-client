import React from "react";

import {Outlet} from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Layout() {
  return (
    <>
      <Header style={{zIndex: 99}} />
      <Outlet style={{zIndex: 1}} />
      <Footer />
    </>
  );
}

export default Layout;
