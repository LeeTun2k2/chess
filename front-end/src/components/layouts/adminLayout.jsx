import React from "react";
import AdminHeader from "../common/adminHeader";
import AdminFooter from "../common/adminFooter";

const AdminLayout = ({ children }) => {
  return (
    <div>
      <AdminHeader />
      <main style={{ minHeight: "70vh" }}>{children}</main>
      <AdminFooter />
    </div>
  );
};

export default AdminLayout;
