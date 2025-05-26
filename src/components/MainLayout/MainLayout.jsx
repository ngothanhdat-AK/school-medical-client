import React from "react";
import {Layout} from "antd";
import {Outlet} from "react-router-dom";
import Sidebar from "../sidebar";

const {Content, Sider} = Layout;

const MainLayout = () => {
  return (
    <Layout style={{minHeight: "100vh"}}>
      {/* Sidebar cố định */}
      <Sider width={250} style={{background: "#fff", padding: "20px"}}>
        <Sidebar />
      </Sider>

      {/* Nội dung sẽ thay đổi dựa trên Router */}
      <Layout style={{padding: "20px"}}>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
