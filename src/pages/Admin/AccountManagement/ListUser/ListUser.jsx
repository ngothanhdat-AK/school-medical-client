import React, {useState, useEffect, useCallback} from "react";
import {Modal} from "antd";
import axiosInstance from "../../../../api/axios";
import CreateUser from "../CreateUser/CreateUser";
import EditUser from "../EditUser/EditUser";
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
import {PlusOutlined, SearchOutlined, StopOutlined} from "@ant-design/icons";

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
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        PageIndex: pageIndex,
        PageSize: pageSize,
      };

      const response = await axiosInstance.get(`/api/users/roles/${roleName}`, {
        params,
      });
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
  const filteredUsers = searchText
    ? users.filter((user) =>
        (user.fullName || "").toLowerCase().includes(searchText.toLowerCase())
      )
    : users;

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
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
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
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (status ? "Active" : "Banned"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{display: "flex", gap: 8}}>
          {roleName !== "parent" && (
            <Button
              size="middle"
              style={{borderColor: "#355383"}}
              variant="outlined"
              onClick={() => {
                setEditingUserId(record.userId);
                setShowEditModal(true);
              }}
            >
              Edit
            </Button>
          )}
          <Popconfirm
            title="Are you sure you want to ban this user?"
            onConfirm={() => handleDelete(record.userId)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              variant="outlined"
              size="middle"
              color="red"
              icon={<StopOutlined />}
            >
              Ban
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
          onClick={() => setShowCreateModal(true)}
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

      <Modal
        open={showCreateModal}
        onCancel={() => setShowCreateModal(false)}
        footer={null}
        title="Create Staff Account"
        width={800}
      >
        <CreateUser
          onSuccess={() => {
            setShowCreateModal(false);
            fetchUsers();
          }}
        />
      </Modal>

      <Modal
        open={showEditModal}
        onCancel={() => setShowEditModal(false)}
        footer={null}
        title="Edit Staff Account"
        width={800}
      >
        <EditUser
          userId={editingUserId}
          onSuccess={() => {
            setShowEditModal(false);
            fetchUsers();
          }}
        />
      </Modal>
    </div>
  );
}

export default UsersByRole;
