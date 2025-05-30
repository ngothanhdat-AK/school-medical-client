import React, { useState } from "react";
import * as XLSX from "xlsx";
import { axiosFormData } from "../../../../api/axios";
import { Button, Upload, Alert } from "antd"; 
import { UploadOutlined } from "@ant-design/icons";
import 'antd/dist/reset.css';

const AddStudent = () => {
  const [data, setData] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [showAlert, setShowAlert] = useState(false); // Thành công
  const [showErrorAlert, setShowErrorAlert] = useState(false); // Thất bại

  const handleBeforeUpload = (file) => {
    // Đọc file Excel để show dữ liệu
    const reader = new FileReader();
    reader.onload = (e) => {
      const Str = e.target.result;
      console.log("File content:", Str); // In nội dung file để kiểm tra
      const workbook = XLSX.read(Str, { type: "binary" });
      console.log("Workbook:", workbook); // In workbook để kiểm tra
      const worksheetName = workbook.SheetNames[0];
      console.log("Worksheet name:", worksheetName); // In tên worksheet để kiểm tra
      const worksheet = workbook.Sheets[worksheetName];
      console.log("Worksheet data:", worksheet); // In dữ liệu worksheet để kiểm tra
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      setData(jsonData);
      console.log("Parsed data:", jsonData); // In dữ liệu đã parse để kiểm tra
    };
    reader.readAsBinaryString(file);

    // Cập nhật fileList theo dạng mảng 1 file (ghi đè file cũ)
    setFileList([file]);

    // Return false để không tự động upload của antd
    return false;
  };

  const handleRemove = () => {
    setFileList([]);
    setData([]);
  };

  const handleUpload = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return;
    }
    if (fileList.length === 0) {
      return;
    }

    const formData = new FormData();
    formData.append("file", fileList[0]);

    setUploading(true);
    try {
      const response = await axiosFormData.post("/students/upload-excel", formData);
      console.log("Upload response:", response.data.items);
      setShowAlert(true); // Hiện alert thành công
      setTimeout(() => setShowAlert(false), 3000); // Ẩn alert sau 3s
      setFileList([]);
      setData([]);
    } catch (error) {
      console.error("Upload failed:", error);
      setShowErrorAlert(true); // Hiện alert thất bại
      setTimeout(() => setShowErrorAlert(false), 3000); // Ẩn alert sau 3s
    } finally {
      setUploading(false);
    }
  };
  return <div className="container">
      <Upload
        beforeUpload={handleBeforeUpload}
        onRemove={handleRemove}
        fileList={fileList}
        maxCount={1} // chỉ cho chọn 1 file, ghi đè file cũ
      >
        <Button icon={<UploadOutlined />}>Chọn file Excel</Button>
      </Upload>

      {data.length > 0 && (
        <>
          <table border="1" style={{ marginTop: 16, borderCollapse: "collapse" }}>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((item, index) => (
                    <td key={index} style={{ padding: 4, border: "1px solid #ccc" }}>{item}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <Button
            type="primary"
            onClick={handleUpload}
            disabled={fileList.length === 0}
            loading={uploading}
            style={{ marginTop: 16 }}
          >
            {uploading ? "uploading..." : "Uploaded"}
          </Button>
        </>
      )}

      {showAlert && (
        <Alert
          message="Upload successful!"
          type="success"
          closable
          style={{
            position: "fixed",
            top: 120,
            right: 0,
            width: 300,
            zIndex: 9999,
          }}
          onClose={() => setShowAlert(false)}
        />
      )}

      {showErrorAlert && (
        <Alert
          message="Upload failed!"
          type="error"
          closable
          style={{
            position: "fixed",
            top: 120,
            right: 0,
            width: 300,
            zIndex: 9999,
          }}
          onClose={() => setShowErrorAlert(false)}
        />
      )}
    </div>;
};

export default AddStudent;
