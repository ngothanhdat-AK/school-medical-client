import React from "react";
import {Layout} from "antd";
import {Outlet} from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import SystemHeader from "../SystemHeader/SystemHeader"; // Thêm dòng này
import {useSelector} from "react-redux";

const {Content, Sider} = Layout;

const MainLayout = () => {
  // Lấy role từ Redux hoặc localStorage
  const role =
    useSelector((state) => state.user.role) || localStorage.getItem("role");

  return (
    <Layout
      style={{
        minHeight: "100vh",
        flexDirection: "column",
        background: "#fff",
        zIndex: 0,
      }}
    >
      {/* SystemHeader phía trên cùng */}
      {(role === "admin" || role === "manager" || role === "nurse") && (
        <div>
          <SystemHeader
            style={{
              background: "#fff", // Đặt màu nền header là trắng
              boxShadow: "0 2px 8px 0 rgba(53,83,131,0.10)", // Đổ bóng rất lớn (bạn nên dùng shadow nhỏ hơn nếu chỉ muốn bóng dưới)
              zIndex: 10, // Bóng chỉ bên phải
            }}
          />
        </div>
      )}
      <Layout style={{flex: 1}}>
        {/* Sidebar cố định */}
        <Sider
          width={250}
          style={{
            background: "#fff",
            boxShadow: "0 0px 4px 0 rgba(53, 83, 131, 0.10)",
          }}
        >
          <Sidebar />
        </Sider>
        {/* Nội dung sẽ thay đổi dựa trên Router */}
        <Layout>
          <Content
            style={{
              padding:
                role === "admin" || role === "manager" || role === "nurse"
                  ? "50px"
                  : "20px",
              background: "none",
              zIndex: 0,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
