import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {Menu} from "antd";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  SolutionOutlined,
  FileTextOutlined,
  FormOutlined,
  ProfileOutlined,
  HomeOutlined,
  MedicineBoxOutlined,
  FileAddOutlined,
  FileDoneOutlined,
  FileSearchOutlined,
  BellOutlined,
} from "@ant-design/icons";
import {setUserInfo} from "../../redux/feature/userSlice";
import "./index.scss"; // Import your CSS styles for the sidebar

const Sidebar = () => {
  const role = useSelector((state) => state.user.role);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!role) return null;

  const adminMenu = [
    {
      label: "Dashboard",
      key: "/admin",
      icon: <DashboardOutlined />,
      link: "/admin",
    },
    {
      label: "Campaign",
      key: "campaign",
      icon: <CalendarOutlined />,
      dropdown: [
        {
          label: "Campaign List",
          key: "/admin/campaign/campaign-list",
          link: "/admin/campaign/campaign-list",
          icon: <FileTextOutlined />,
        },
        {
          label: "Create Campaign",
          key: "/admin/campaign/create-campaign",
          link: "/admin/campaign/create-campaign",
          icon: <FileAddOutlined />,
        },
        {
          label: "Detail Campaign",
          key: "/admin/campaign/detail-campaign",
          link: "/admin/campaign/detail-campaign",
          icon: <FileSearchOutlined />,
        },
        {
          label: "History Campaign",
          key: "/admin/campaign/history-campaign",
          link: "/admin/campaign/history-campaign",
          icon: <FileDoneOutlined />,
        },
      ],
    },
    {
      label: "Student Management",
      key: "student-management",
      icon: <TeamOutlined />,
      dropdown: [
        {
          label: "Add Student",
          key: "/admin/student-management/add-student",
          link: "/admin/student-management/add-student",
          icon: <UserOutlined />,
        },
        {
          label: "Student List",
          key: "/admin/student-management/student-list",
          link: "/admin/student-management/student-list",
          icon: <TeamOutlined />,
        },
      ],
    },
    {
      label: "Profile",
      key: "/admin/profile",
      icon: <ProfileOutlined />,
      link: "/admin/profile",
    },
  ];

  const menuItemsByRole = {
    admin: [
      {
        label: "Dashboard",
        key: "/admin",
        icon: <DashboardOutlined />,
        link: "/admin",
      },
      {
        label: "Account Management",
        key: "account-management",
        icon: <UserOutlined />,
        dropdown: [
          {
            label: "List User",
            key: "/admin/account-management/list-user",
            link: "/admin/account-management/list-user",
            icon: <TeamOutlined />,
          },
        ],
      },
      ...adminMenu.slice(1),
    ],
    manager: adminMenu,
    nurse: [
      {
        label: "Dashboard",
        key: "/nurse",
        icon: <DashboardOutlined />,
        link: "/nurse",
      },
      {
        label: "Appointment Management",
        key: "appointment-management",
        icon: <SolutionOutlined />,
        dropdown: [
          {
            label: "Appointment List",
            key: "/nurse/appointment-management/appointment-list",
            link: "/nurse/appointment-management/appointment-list",
            icon: <FileTextOutlined />,
          },
          {
            label: "Appointment Detail",
            key: "/nurse/appointment-management/appointment-detail",
            link: "/nurse/appointment-management/appointment-detail",
            icon: <FileSearchOutlined />,
          },
        ],
      },
      {
        label: "Campaign",
        key: "campaign",
        icon: <CalendarOutlined />,
        dropdown: [
          {
            label: "Campaign List",
            key: "/nurse/campaign/campaign-list",
            link: "/nurse/campaign/campaign-list",
            icon: <FileTextOutlined />,
          },
          {
            label: "Detail Campaign",
            key: "/nurse/campaign/detail-campaign",
            link: "/nurse/campaign/detail-campaign",
            icon: <FileSearchOutlined />,
          },
          {
            label: "History Campaign",
            key: "/nurse/campaign/history-campaign",
            link: "/nurse/campaign/history-campaign",
            icon: <FileDoneOutlined />,
          },
          {
            label: "Record Form",
            key: "/nurse/campaign/record-form",
            link: "/nurse/campaign/record-form",
            icon: <FormOutlined />,
          },
        ],
      },
      {
        label: "Medical Event",
        key: "medical-event",
        icon: <MedicineBoxOutlined />,
        dropdown: [
          {
            label: "Create Medical Event",
            key: "/nurse/medical-event/create-medical-event",
            link: "/nurse/medical-event/create-medical-event",
            icon: <FileAddOutlined />,
          },
          {
            label: "Medical Event List",
            key: "/nurse/medical-event/medical-event-list",
            link: "/nurse/medical-event/medical-event-list",
            icon: <FileTextOutlined />,
          },
        ],
      },
      {
        label: "Profile",
        key: "/nurse/profile",
        icon: <ProfileOutlined />,
        link: "/nurse/profile",
      },
    ],

    parent: [
      {
        label: "Home",
        key: "/parent",
        icon: <HomeOutlined />,
        link: "/parent",
      },
      {
        label: "Appointment",
        key: "appointment",
        icon: <SolutionOutlined />,
        dropdown: [
          {
            label: "Appointment List",
            key: "/parent/appointments-list",
            link: "/parent/appointments-list",
            icon: <FileTextOutlined />,
          },
          {
            label: "Appointment Form",
            key: "/parent/appointment-form",
            link: "/parent/appointment-form",
            icon: <FormOutlined />,
          },
          {
            label: "Appointment History",
            key: "/parent/appointment-history",
            link: "/parent/appointment-history",
            icon: <FileDoneOutlined />,
          },
          {
            label: "Calendar Appointment",
            key: "/parent/calender-appointment",
            link: "/parent/calender-appointment",
            icon: <CalendarOutlined />,
          },
        ],
      },
      {
        label: "Health Declaration",
        key: "health-declaration",
        icon: <FileTextOutlined />,
        dropdown: [
          {
            label: "Declaration Form",
            key: "/parent/health-declaration",
            link: "/parent/health-declaration",
            icon: <FormOutlined />,
          },
          {
            label: "My Children",
            key: "/parent/health-declaration/my-children",
            link: "/parent/health-declaration/my-children",
            icon: <TeamOutlined />,
          },
          {
            label: "Declaration Detail",
            key: "/parent/health-declaration/detail",
            link: "/parent/health-declaration/detail",
            icon: <FileSearchOutlined />,
          },
        ],
      },
      {
        label: "Medical Registration",
        key: "medical-registration",
        icon: <SolutionOutlined />,
        dropdown: [
          {
            label: "Create Medical Registration",
            key: "/parent/medical-registration/create",
            link: "/parent/medical-registration/create",
            icon: <FileAddOutlined />,
          },
          {
            label: "Medical Registration List",
            key: "/parent/medical-registration/list",
            link: "/parent/medical-registration/list",
            icon: <FileTextOutlined />,
          },
          {
            label: "Detail Medical Registration",
            key: "/parent/medical-registration/detail",
            link: "/parent/medical-registration/detail",
            icon: <FileSearchOutlined />,
          },
        ],
      },
      {
        label: "Notification",
        key: "/parent/notification",
        icon: <BellOutlined />,
        link: "/parent/notification",
      },
      {
        label: "Profile",
        key: "/parent/profile",
        icon: <ProfileOutlined />,
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
          <Menu.SubMenu key={item.key} title={item.label} icon={item.icon}>
            {item.dropdown.map((sub) => (
              <Menu.Item key={sub.key} icon={sub.icon}>
                <Link to={sub.link}>{sub.label}</Link>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        );
      }
      return (
        <Menu.Item key={item.key} icon={item.icon}>
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
