import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {Menu} from "antd";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {DownOutlined} from "@ant-design/icons";
import {setUserInfo} from "../../redux/feature/userSlice";
import "./index.scss"; // Import your CSS styles for the sidebar

const Sidebar = () => {
  const role = useSelector((state) => state.user.role);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!role) return null;

  const adminMenu = [
    {label: "Dashboard", key: "/admin", link: "/admin"},
    // Account Management sẽ bị loại bỏ cho manager
    {
      label: "Campaign",
      key: "campaign",
      dropdown: [
        {
          label: "Campaign List",
          key: "/admin/campaign/campaign-list",
          link: "/admin/campaign/campaign-list",
        },
        {
          label: "Create Campaign",
          key: "/admin/campaign/create-campaign",
          link: "/admin/campaign/create-campaign",
        },
        {
          label: "Detail Campaign",
          key: "/admin/campaign/detail-campaign",
          link: "/admin/campaign/detail-campaign",
        },
        {
          label: "History Campaign",
          key: "/admin/campaign/history-campaign",
          link: "/admin/campaign/history-campaign",
        },
      ],
    },
    {
      label: "Student Management",
      key: "student-management",
      dropdown: [
        {
          label: "Add Student",
          key: "/admin/student-management/add-student",
          link: "/admin/student-management/add-student",
        },
        {
          label: "Student List",
          key: "/admin/student-management/student-list",
          link: "/admin/student-management/student-list",
        },
      ],
    },
    {
      label: "Profile",
      key: "/admin/profile",
      link: "/admin/profile",
    },
  ];

  const menuItemsByRole = {
    admin: [
      // ...Account Management...
      {label: "Dashboard", key: "/admin", link: "/admin"},
      {
        label: "Account Management",
        key: "account-management",
        dropdown: [
          {
            label: "Create / Update User",
            key: "/admin/account-management/create-update-user",
            link: "/admin/account-management/create-update-user",
          },
          {
            label: "List User",
            key: "/admin/account-management/list-user",
            link: "/admin/account-management/list-user",
          },
          {
            label: "User Form",
            key: "/admin/account-management/user-form",
            link: "/admin/account-management/user-form",
          },
        ],
      },
      ...adminMenu.slice(1), // các mục còn lại giống manager
    ],
    manager: adminMenu, // manager dùng menu này, không có Account Management
    nurse: [
      {label: "Dashboard", key: "/nurse", link: "/nurse"},
      {
        label: "Appointment Management",
        key: "appointment-management",
        dropdown: [
          {
            label: "Appointment List",
            key: "/nurse/appointment-management/appointment-list",
            link: "/nurse/appointment-management/appointment-list",
          },
          {
            label: "Appointment Detail",
            key: "/nurse/appointment-management/appointment-detail",
            link: "/nurse/appointment-management/appointment-detail",
          },
        ],
      },
      {
        label: "Campaign",
        key: "campaign",
        dropdown: [
          {
            label: "Campaign List",
            key: "/nurse/campaign/campaign-list",
            link: "/nurse/campaign/campaign-list",
          },
          {
            label: "Detail Campaign",
            key: "/nurse/campaign/detail-campaign",
            link: "/nurse/campaign/detail-campaign",
          },
          {
            label: "History Campaign",
            key: "/nurse/campaign/history-campaign",
            link: "/nurse/campaign/history-campaign",
          },
          {
            label: "Record Form",
            key: "/nurse/campaign/record-form",
            link: "/nurse/campaign/record-form",
          },
        ],
      },
      {
        label: "Medical Event",
        key: "medical-event",
        dropdown: [
          {
            label: "Create Medical Event",
            key: "/nurse/medical-event/create-medical-event",
            link: "/nurse/medical-event/create-medical-event",
          },
          {
            label: "Medical Event List",
            key: "/nurse/medical-event/medical-event-list",
            link: "/nurse/medical-event/medical-event-list",
          },
        ],
      },
      {
        label: "Profile",
        key: "/nurse/profile",
        link: "/nurse/profile",
      },
    ],

    parent: [
      {label: "Home", key: "/parent", link: "/parent"},
      {
        label: "Appointment",
        key: "appointment",
        dropdown: [
          {
            label: "Appointment List",
            key: "/parent/appointments-list",
            link: "/parent/appointments-list",
          },
          {
            label: "Appointment Form",
            key: "/parent/appointment-form",
            link: "/parent/appointment-form",
          },
          {
            label: "Appointment History",
            key: "/parent/appointment-history",
            link: "/parent/appointment-history",
          },
          {
            label: "Calendar Appointment",
            key: "/parent/calender-appointment",
            link: "/parent/calender-appointment",
          },
        ],
      },
      {
        label: "Health Declaration",
        key: "health-declaration",
        dropdown: [
          {
            label: "Declaration Form",
            key: "/parent/health-declaration",
            link: "/parent/health-declaration",
          },
          {
            label: "My Children",
            key: "/parent/health-declaration/my-children",
            link: "/parent/health-declaration/my-children",
          },
          {
            label: "Declaration Detail",
            key: "/parent/health-declaration/detail",
            link: "/parent/health-declaration/detail",
          },
        ],
      },
      {
        label: "Medical Registration",
        key: "medical-registration",
        dropdown: [
          {
            label: "Create Medical Registration",
            key: "/parent/medical-registration/create",
            link: "/parent/medical-registration/create",
          },
          {
            label: "Medical Registration List",
            key: "/parent/medical-registration/list",
            link: "/parent/medical-registration/list",
          },
          {
            label: "Detail Medical Registration",
            key: "/parent/medical-registration/detail",
            link: "/parent/medical-registration/detail",
          },
        ],
      },
      {
        label: "Notification",
        key: "/parent/notification",
        link: "/parent/notification",
      },
      {
        label: "Profile",
        key: "/parent/profile",
        link: "/parent/profile",
      },
    ],
  };

  const menuItems = menuItemsByRole[role] || [];

  // Render menu items and submenus
  const renderMenuItems = (items) =>
    items.map((item) => {
      if (item.dropdown) {
        return (
          <Menu.SubMenu
            key={item.key}
            title={item.label}
            icon={<DownOutlined />}
          >
            {item.dropdown.map((sub) => (
              <Menu.Item key={sub.key}>
                <Link to={sub.link}>{sub.label}</Link>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        );
      }
      return (
        <Menu.Item key={item.key}>
          <Link to={item.link}>{item.label}</Link>
        </Menu.Item>
      );
    });

  // Xác định menu được chọn và mở dựa trên location hiện tại
  const selectedKeys = [];
  const openKeys = [];

  menuItems.forEach((item) => {
    if (item.dropdown) {
      item.dropdown.forEach((sub) => {
        if (location.pathname === sub.link) {
          selectedKeys.push(sub.key);
          openKeys.push(item.key);
        }
      });
    } else {
      if (location.pathname === item.link) {
        selectedKeys.push(item.key);
      }
    }
  });

  // Thêm hàm logout
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    dispatch(setUserInfo({role: null, userId: null}));
    navigate("/login");
  };

  return (
    <div style={{width: 250, height: "100vh", background: "#fff"}}>
      {/* Hiển thị Hello, role và Logout nếu là admin, manager, nurse */}
      {(role === "admin" || role === "manager" || role === "nurse") && (
        <div
          style={{
            padding: "16px",
            borderBottom: "1px solid #eee",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{fontWeight: "bold"}}>Hello, {role}</span>
          <button onClick={handleLogout} className="logout">
            Logout
          </button>
        </div>
      )}
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        defaultOpenKeys={openKeys}
        style={{height: "100%", borderRight: 0}}
      >
        {renderMenuItems(menuItems)}
      </Menu>
    </div>
  );
};

export default Sidebar;
