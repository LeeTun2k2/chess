import React from "react";
import Header from "../common/header";
import Footer from "../common/footer";

const ClientLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default ClientLayout;
