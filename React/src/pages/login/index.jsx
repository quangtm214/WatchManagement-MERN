import React, { useContext, useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Row,
  Col,
  Typography,
  message,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../service/authAPI/authProvideAPI";

const { Text } = Typography;

const Login = () => {
  const [registerClicked, setRegisterClicked] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const onFinish = async (values) => {
    const user = await login(values.name, values.password);
    if (user) {
      console.log(user);
      navigate("/");
    } else {
      message.error("name or password is incorrect!");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={24} sm={24} md={12} lg={8} xl={6}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1>Login</h1>
        </div>
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
            label="Name"
            name="name"
            rules={[
              {
                required: registerClicked,
                message: "Please enter your Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: registerClicked,
                message: "Please enter your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => setRegisterClicked(true)}
              style={{
                backgroundColor: "black",
                borderColor: "black",
                color: "white",
                width: "100%",
              }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center" }}>
          <Text>
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </Text>
          <br />
        </div>
      </Col>
    </Row>
  );
};

export default Login;
