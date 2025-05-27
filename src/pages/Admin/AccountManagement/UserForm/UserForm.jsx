// import React, {useEffect, useState} from "react";

// const UserForm = ({mode, role, userId}) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//   });

//   useEffect(() => {
//     if (mode === "edit" && userId) {
//       // TODO: gọi API lấy chi tiết user để setFormData
//     }
//   }, [mode, userId]);

//   const handleChange = (e) => {
//     const {name, value} = e.target;
//     setFormData((prev) => ({...prev, [name]: value}));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (mode === "create") {
//       // TODO: gọi API tạo user mới với role
//     } else {
//       // TODO: gọi API cập nhật userId
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>{mode === "create" ? `Tạo mới ${role}` : `Cập nhật ${role}`}</h2>
//       <input
//         name="name"
//         value={formData.name}
//         onChange={handleChange}
//         placeholder="Tên"
//         required
//       />
//       <input
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         placeholder="Email"
//         type="email"
//         required
//       />
//       <input
//         name="phone"
//         value={formData.phone}
//         onChange={handleChange}
//         placeholder="Điện thoại"
//         required
//       />
//       {mode === "create" && (
//         <input
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Mật khẩu"
//           type="password"
//           required
//         />
//       )}
//       <button type="submit">{mode === "create" ? "Tạo" : "Cập nhật"}</button>
//     </form>
//   );
// };

// export default UserForm;
import React from "react";

const UserForm = () => {
  return <div>UserForm</div>;
};

export default UserForm;
