import React, { useEffect, useState } from "react";
import { Table, Typography } from "antd";
import { getMembersAPI } from "../../service/memberAPI/memberAPI";

const { Title } = Typography;

const UserManagement = () => {
  const [members, setMembers] = useState([]);

  const getMembers = async () => {
    try {
      const response = await getMembersAPI();
      console.log("response", response.data);
      setMembers(response.data);
    } catch (error) {
      console.error("Failed to fetch members:", error);
    }
  };

  useEffect(() => {
    getMembers();
  }, []);

  const columns = [
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Member Name",
      dataIndex: "membername",
      key: "membername",
    },
    {
      title: "Is Admin",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (isAdmin) => (isAdmin ? "Yes" : "No"),
    },
  ];

  return (
    <div className="container">
      <Title level={1}>User Management</Title>
      <Table
        dataSource={members}
        columns={columns}
        rowKey={(record) => record._id}
        pagination={false}
      />
    </div>
  );
};

export default UserManagement;
