import React from "react";
import { Register } from "../../service/authAPI/RegisterAPI";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form, Input, Row, Typography } from "antd";
const { Text } = Typography;

export default function SignUp() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const member = {
      membername: values.membername,
      password: values.password,
    };
    console.log("member", member);
    const response = await Register(member);
    if (response?.status === 201) {
      alert("Đăng ký thành công");
      navigate("/login");
    } else {
      alert("name has been used or something went wrong!");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={24} sm={24} md={12} lg={8} xl={6}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{ maxWidth: 400, margin: "auto" }}
        >
          <Form.Item
            label="membername"
            name="membername"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="confirmPassword"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
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

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "black",
                borderColor: "black",
                color: "white",
                width: "100%",
              }}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center" }}>
          <Text>
            You have Account? <Link to="/login">Login</Link>
          </Text>
          <br />
        </div>
      </Col>
    </Row>
  );
}
