import React, {useState, useEffect, useCallback} from "react";
import axiosInstance from "../../../../api/axios";
import {
  Table,
  Select,
  Pagination,
  Spin,
  Alert,
  Input,
  Button,
  Popconfirm,
} from "antd";
import {useNavigate} from "react-router-dom";
import {PlusOutlined, SearchOutlined} from "@ant-design/icons";

const ROLE_OPTIONS = [
  {label: "Parent", value: "parent"},
  {label: "Admin", value: "admin"},
  {label: "Manager", value: "manager"},
  {label: "Nurse", value: "nurse"},
];

function UsersByRole() {
  const [roleName, setRoleName] = useState("parent");
  const [users, setUsers] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const pageSize = 10;
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        PageIndex: pageIndex,
        PageSize: pageSize,
      };

      const response = await axiosInstance.get(
        `/api/users/roles/${encodeURIComponent(roleName)}`,
        {params}
      );
      // console.log(response.data.items);
      setUsers(response.data.items || []);
      setTotalCount(response.data.count || 0);
    } catch (err) {
      setError(err.response?.data || err.message || "Error fetching data");
      setUsers([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [roleName, pageIndex, pageSize]);

  useEffect(() => {
    fetchUsers();
  }, [roleName, pageIndex, pageSize, fetchUsers]);

  // Lọc users theo searchText
  const filteredUsers = users.filter((user) =>
    user.fullName?.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDelete = async (userId) => {
    // console.log(`Deleting user with ID: ${userId.toUpperCase()}`);
    try {
      await axiosInstance.delete(`/api/users/${userId}`, {
        data: false,
      });
      fetchUsers();
    } catch (error) {
      console.log(error);
      setError("Cannot delete user");
    }
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "emailAddress",
      key: "emailAddress",
    },
    {
      title: "Role",
      dataIndex: "roleName",
      key: "roleName",
    },
    {
      title: "Date of Birth",
      dataIndex: "dayOfBirth",
      key: "dayOfBirth",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (status ? "Active" : "Inactive"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{display: "flex", gap: 8}}>
          <Button
            size="middle"
            style={{borderColor: "#355383"}}
            variant="outlined"
            onClick={() => {
              // Lưu userId vào sessionStorage hoặc localStorage
              localStorage.setItem("editUserId", record.userId);
              navigate("/admin/account-management/edit-user");
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa user này?"
            onConfirm={() => handleDelete(record.userId)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              size="middle"
              style={{borderColor: "red"}}
              variant="outlined"
            >
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2>User List</h2>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          gap: 16,
          alignItems: "center",
        }}
      >
        <Select
          value={roleName}
          style={{width: 180}}
          onChange={(value) => {
            setRoleName(value);
            setPageIndex(1);
          }}
          options={ROLE_OPTIONS}
        />
        <Input
          placeholder="Search by full name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{width: 220}}
          allowClear
          prefix={<SearchOutlined />}
        />
        <Button
          type="primary"
          style={{backgroundColor: "#355383"}}
          size="middle"
          icon={<PlusOutlined />}
          onClick={() => navigate("/admin/account-management/create-user")}
        >
          Create
        </Button>
      </div>

      {error && (
        <Alert type="error" message={error} style={{marginBottom: 16}} />
      )}
      <Spin spinning={loading}>
        <Table
          dataSource={filteredUsers}
          columns={columns}
          rowKey="userId"
          pagination={false}
          locale={{
            emptyText: !loading && !error ? "No users found" : undefined,
          }}
        />
      </Spin>
      <div style={{marginTop: 16, textAlign: "right"}}>
        <Pagination
          current={pageIndex}
          pageSize={pageSize}
          total={totalCount}
          showSizeChanger={false}
          showQuickJumper
          onChange={(page) => setPageIndex(page)}
        />
      </div>
    </div>
  );
}

export default UsersByRole;
