// src/pages/ProtectedPage.js
import { Table, Button, Tooltip, Tag } from "antd";
import { useState } from "react";
import {
  ExclamationCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import { Modal, message } from "antd";

const { confirm } = Modal;

const ProtectedPage = () => {
  const [users, setUsers] = useState([
    {
      key: "1",
      name: "Michael Holz",
      email: "michael.holz@example.com",
      createdAt: "2013-04-10",
      role: "Admin",
      status: "Active",
      profilePicture: "https://i.pravatar.cc/150?img=1", 
    },
    {
      key: "2",
      name: "Paula Wilson",
      email: "paula.wilson@example.com",
      createdAt: "2014-05-08",
      role: "Publisher",
      status: "Active",
      profilePicture: "https://i.pravatar.cc/150?img=2", 
    },
    {
      key: "3",
      name: "Antonio Moreno",
      email: "antonio.moreno@example.com",
      createdAt: "2015-11-05",
      role: "Publisher",
      status: "Suspended",
      profilePicture: "https://i.pravatar.cc/150?img=3", 
    },
    {
      key: "4",
      name: "Mary Saveley",
      email: "mary.saveley@example.com",
      createdAt: "2016-06-09",
      role: "Reviewer",
      status: "Active",
      profilePicture: "https://i.pravatar.cc/150?img=4", 
    },
    {
      key: "5",
      name: "Martin Sommer",
      email: "martin.sommer@example.com",
      createdAt: "2017-12-08",
      role: "Moderator",
      status: "Inactive",
      profilePicture: "https://i.pravatar.cc/150?img=5", 
    },
  ]);

  const showDeleteConfirm = (key) => {
    confirm({
      title: "Are you sure you want to delete this user?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "No, cancel",
      onOk() {
        setUsers((prevUsers) => prevUsers.filter((user) => user.key !== key));
        message.success("User deleted successfully");
      },
      onCancel() {
        message.info("Deletion cancelled");
      },
    });
  };

  // Render status with color-coded tags
  const renderStatusTag = (status) => {
    let color;
    if (status === "Active") color = "green";
    else if (status === "Suspended") color = "red";
    else if (status === "Inactive") color = "orange";

    return <Tag color={color}>{status}</Tag>;
  };

  // Table columns
  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, record) => (
        <div className="flex items-center">
          <Avatar
            src={record.profilePicture}
            alt={name}
            style={{ marginRight: 10 }}
          />
          {name}
        </div>
      ),
    },
    {
      title: "Date Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
      align: "center",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => renderStatusTag(status),
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <div className="flex justify-center items-center space-x-3">
          <Tooltip title="Edit">
            <Button shape="circle" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => showDeleteConfirm(record.key)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="p-5 flex justify-center items-center min-h-screen bg-gray-100">
      <Table
        columns={columns}
        dataSource={users}
        bordered
        pagination={false}
        className="shadow-md"
        style={{
          width: "80%",
          maxWidth: "800px",
          margin: "0 auto",
          background: "#fff",
        }} 
      />
    </div>
  );
};

export default ProtectedPage;
