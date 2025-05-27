// import React, {useState, useEffect} from "react";

// const ListUser = () => {
//   const [selectedRole, setSelectedRole] = useState("manager");
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchUsersByRole(selectedRole);
//   }, [selectedRole]);

//   const fetchUsersByRole = async (role) => {
//     setLoading(true);
//     try {
//       // TODO: Gọi API backend lấy user theo role
//       // Ví dụ: const res = await axios.get(`/api/users?role=${role}`);
//       // setUsers(res.data);

//       // Tạm demo dữ liệu giả
//       const demoData = {
//         manager: [
//           {
//             id: 1,
//             name: "Manager A",
//             email: "managerA@example.com",
//             phone: "0123456789",
//           },
//           {
//             id: 2,
//             name: "Manager B",
//             email: "managerB@example.com",
//             phone: "0987654321",
//           },
//         ],
//         nurse: [
//           {
//             id: 3,
//             name: "Nurse A",
//             email: "nurseA@example.com",
//             phone: "0123987654",
//           },
//         ],
//         parent: [
//           {
//             id: 4,
//             name: "Parent A",
//             email: "parentA@example.com",
//             phone: "0192837465",
//           },
//         ],
//       };

//       setUsers(demoData[role] || []);
//     } catch (error) {
//       console.error("Lấy danh sách user lỗi", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreate = () => {
//     // TODO: Điều hướng tới trang tạo user, ví dụ:
//     // navigate(`/admin/account-management/create/${selectedRole}`);
//     alert(`Điều hướng tạo mới user cho role: ${selectedRole}`);
//   };

//   const handleEdit = (userId) => {
//     // TODO: Điều hướng tới trang cập nhật user
//     alert(`Điều hướng sửa user ${userId} của role: ${selectedRole}`);
//   };

//   const handleDelete = (userId) => {
//     // TODO: Gọi API xóa user, sau đó reload danh sách
//     alert(`Xóa user ${userId} của role: ${selectedRole}`);
//   };

//   return (
//     <div>
//       <h1>Quản lý tài khoản</h1>

//       {/* Nút chọn role */}
//       <div style={{marginBottom: "20px"}}>
//         {["manager", "nurse", "parent"].map((role) => (
//           <button
//             key={role}
//             onClick={() => setSelectedRole(role)}
//             style={{
//               marginRight: 10,
//               padding: "8px 16px",
//               backgroundColor: selectedRole === role ? "#1890ff" : "#f0f0f0",
//               color: selectedRole === role ? "#fff" : "#000",
//               border: "none",
//               borderRadius: 4,
//               cursor: "pointer",
//             }}
//           >
//             {role.charAt(0).toUpperCase() + role.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Nút tạo mới */}
//       <button
//         onClick={handleCreate}
//         style={{marginBottom: "10px", padding: "8px 16px"}}
//       >
//         Tạo mới {selectedRole}
//       </button>

//       {/* Danh sách user */}
//       {loading ? (
//         <p>Đang tải danh sách...</p>
//       ) : (
//         <table border="1" cellPadding="8" cellSpacing="0" width="100%">
//           <thead>
//             <tr>
//               <th>Tên</th>
//               <th>Email</th>
//               <th>Điện thoại</th>
//               <th>Hành động</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.length === 0 ? (
//               <tr>
//                 <td colSpan="4" style={{textAlign: "center"}}>
//                   Không có dữ liệu
//                 </td>
//               </tr>
//             ) : (
//               users.map((user) => (
//                 <tr key={user.id}>
//                   <td>{user.name}</td>
//                   <td>{user.email}</td>
//                   <td>{user.phone}</td>
//                   <td>
//                     <button onClick={() => handleEdit(user.id)}>Sửa</button>{" "}
//                     <button onClick={() => handleDelete(user.id)}>Xóa</button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ListUser;

{
  /* <Route path="admin/account-management">
  <Route
    index
    element={<ListUser role="manager" />}
  />
  <Route path="list/:role" element={<ListUserWrapper />} />
  <Route path="create/:role" element={<CreateUser />} />
  <Route path="update/:role/:userId" element={<UpdateUser />} />
</Route> */
}

import React from "react";

const ListUser = () => {
  return <div>ListUser</div>;
};

export default ListUser;
