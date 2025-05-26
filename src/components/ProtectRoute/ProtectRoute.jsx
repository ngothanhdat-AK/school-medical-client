// ProtectedRoute.jsx
import React from "react";
import {Navigate} from "react-router-dom";

function ProtectedRoute({children, allowedRoles}) {
  // Lấy token từ localStorage
  const token = localStorage.getItem("accessToken");

  if (!token) {
    // Nếu chưa login thì redirect về login
    return <Navigate to="/login" replace />;
  }

  // Giải mã token để lấy role
  const payloadBase64 = token.split(".")[1];
  const base64 = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");
  let decodedPayload = {};
  try {
    decodedPayload = JSON.parse(atob(base64));
  } catch {
    // Token không hợp lệ thì logout hoặc redirect login
    return <Navigate to="/login" replace />;
  }

  const roleClaim =
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
  const userRole = decodedPayload[roleClaim] || decodedPayload["role"] || "";
  console.log("userRole:", userRole);
  // Kiểm tra role có được phép vào không
  if (!allowedRoles.includes(userRole)) {
    // Không có quyền => redirect ra trang khác hoặc 403 page
    return <Navigate to="/" replace />;
  }

  // Được phép => render children
  return children;
}

export default ProtectedRoute;
