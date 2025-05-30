import React, {useState, useEffect, useCallback} from "react";
import {Table, Input, Pagination, Spin, Alert, Button} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import axiosInstance from "../../../../api/axios";
import Swal from "sweetalert2";

const pageSize = 10;

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        PageIndex: pageIndex,
        PageSize: pageSize,
      };
      const response = await axiosInstance.get("/api/students", {params});
      if (response.data.items && response.data.items.length > 0) {
        localStorage.setItem("studentId", response.data.items[0].studentId);
      }
      console.log("Fetched students:", response.data.items);
      setStudents(response.data.items || []);
      setTotalCount(response.data.count || 0);
    } catch (err) {
      setError(err.response?.data || err.message || "Error fetching students");
      setStudents([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, [pageIndex]);

  useEffect(() => {
    fetchStudents();
  }, [pageIndex, fetchStudents]);

  // Lọc theo tên học sinh
  const filteredStudents = students.filter((student) =>
    student.fullName?.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSendCreateAccount = async () => {
    if (filteredStudents.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No students selected",
        toast: true,
        position: "top-end", // Góc phải trên
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      return;
    }
    // Gửi yêu cầu tạo tài khoản cho phụ huynh
    try {
      await axiosInstance.post("/api/accounts/parents/batch-create");
      Swal.fire({
        icon: "success",
        title: "Accounts created successfully",
        toast: true,
        position: "top-end", // Góc phải trên
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error("Error creating accounts:", error);
      Swal.fire({
        icon: "error",
        title: "Error creating accounts",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  const columns = [
    {
      title: "Student Code",
      dataIndex: "studentCode",
      key: "studentCode",
      sorter: (a, b) => a.studentCode.localeCompare(b.studentCode),
    },
    {title: "Full Name", dataIndex: "fullName", key: "fullName"},
    {title: "Date of Birth", dataIndex: "dayOfBirth", key: "dayOfBirth"},
    {title: "Gender", dataIndex: "gender", key: "gender"},
    {title: "Grade", dataIndex: "grade", key: "grade"},
    {title: "Address", dataIndex: "address", key: "address"},
    {
      title: "Parent PhoneNumber",
      dataIndex: "parentPhoneNumber",
      key: "parentPhoneNumber",
    },
    {
      title: "Parent Email",
      dataIndex: "parentEmailAddress",
      key: "parentEmailAddress",
    }, // Thêm dòng này
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "left",
          marginBottom: 16,
          gap: 16,
        }}
      >
        <h2 style={{margin: 0}}>Student List</h2>
      </div>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          gap: 16,
          alignItems: "center",
          justifyContent: "left",
        }}
      >
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
          style={{background: "#355383"}}
          onClick={handleSendCreateAccount}
        >
          Create Account for Parent
        </Button>
      </div>
      {error && (
        <Alert type="error" message={error} style={{marginBottom: 16}} />
      )}
      <Spin spinning={loading}>
        <Table
          dataSource={filteredStudents}
          columns={columns}
          rowKey="studentId"
          pagination={false}
          locale={{
            emptyText: !loading && !error ? "No students found" : undefined,
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
};

export default StudentList;
