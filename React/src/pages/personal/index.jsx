import React, { useContext, useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Divider,
  Spin,
  message,
} from "antd";
import AuthContext from "../../service/authAPI/authProvideAPI";
import {
  changeInforAPI,
  getPersonalAPI,
} from "../../service/authAPI/personalAPI";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function Personal() {
  const { user, changePass } = useContext(AuthContext);
  const navigate = useNavigate();
  const [personal, setPersonal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const getUser = async () => {
    try {
      const response = await getPersonalAPI();
      console.log(response);
      if (response.length === 0) {
        message.error("Please login first!");
        navigate("/login");
      }
      setPersonal(response.data);
    } catch (error) {
      console.error("Failed to fetch personal data:", error);
    } finally {
      setLoading(false);
    }
  };
  const changeInfor = async (values) => {
    try {
      console.log("Change Name:", values);
      const response = await changeInforAPI(values);
      console.log(response);
      if (response && response.data.status === "success") {
        message.success("Change name successfully!");
        setRefresh((prev) => !prev); // Trigger rerender by toggling `refresh`
      } else {
        message.error(response.data.data.message);
      }
    } catch (error) {
      console.error("Failed to change name:", error);
    }
  };

  const chagePassword = async (values) => {
    try {
      console.log("Change Password:", values);
      const respone = await changePass(values.oldPassword, values.newPassword);
      console.log("Response:", respone);
      if (respone.status === "success") {
        message.success("Change password successfully!");
      } else if (respone.status === "fail") {
        message.error(respone.data.message);
      } else {
        message.error("Old password is incorrect!");
      }
    } catch (error) {
      console.error("Failed to change password:", error);
    }
  };
  useEffect(() => {
    getUser();
  }, [refresh]);
  useEffect(() => {
    console.log("Personal:", personal);
  }, [personal]);

  const handleChangeName = (values) => {
    changeInfor(values);
  };

  const handleChangePassword = (values) => {
    console.log("Change Password:", values);
    chagePassword(values);
    // Handle password change logic here
  };
  if (loading) {
    return (
      <Row justify="center" style={{ padding: "20px" }}>
        <Spin />
      </Row>
    );
  }
  return (
    <Row justify="center" style={{ padding: "20px" }}>
      <Col xs={24} md={12}>
        <Card
          bordered={false}
          style={{
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Title level={3}>Personal Information</Title>
          <Divider />
          <Form layout="vertical" onFinish={handleChangeName}>
            <Form.Item
              name="membername"
              label="Name"
              rules={[{ required: true, message: "Please input your name!" }]}
              initialValue={personal?.membername}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ backgroundColor: "black", borderColor: "black" }}
              >
                Change Name
              </Button>
            </Form.Item>
          </Form>
          <Divider />
          <Title level={4}>Change Password</Title>
          <Form layout="vertical" onFinish={handleChangePassword}>
            <Form.Item
              name="oldPassword"
              label="oldPassword"
              rules={[
                { required: true, message: "Please input your oldPassword!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="newPassword"
              label="newPassword"
              rules={[
                { required: true, message: "Please input your newPassword!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["newPassword"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ backgroundColor: "black", borderColor: "black" }}
              >
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
