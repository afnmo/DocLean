import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Input, Button, Row, Col, Typography, message } from "antd";
import "styles/Login.css";

const { Title, Text } = Typography;

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };



  const handleSubmit = async () => {
    try {
        const url = "http://localhost:5000/api/auth"; 
        // const { data: res } = 
        await axios.post(url, data, { withCredentials: true }); 

        window.location = "/"; 

    } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
            setError(error.response.data.message);
            message.error(error.response.data.message);
        } else {
            setError("An unexpected error occurred."); 
            message.error("An unexpected error occurred.");
        }
    }
};


  return (
    <Row justify="center" align="middle" className="login-container">
      <Col xs={22} sm={18} md={12} lg={8} xl={8} className="login-form-container">
        <Row justify="center" className="form-row">
          <Col span={24}>
            <Form layout="vertical" onFinish={handleSubmit}>
              <Title level={2} className="form-title">Welcome Back!</Title>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please input your email!" }]}
              >
                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please input your password!" }]}
              >
                <Input.Password
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={data.password}
                />
              </Form.Item>

              {error && <div className="error-msg">{error}</div>}

              <Form.Item>
                <Button type="primary" htmlType="submit" block className="login-btn-filled">
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>

        <Row justify="center" className="form-row">
          <Col span={24} className="text-center">
            <Text className="signup-text">Don't have an account? </Text>
            <Link to="/signup">
              <Button type="default" block className="login-btn-outlined">
                Sign Up
              </Button>
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Login;
