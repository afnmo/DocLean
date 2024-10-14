import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Row, Col, Typography, message } from "antd";
import "styles/Signup.css"; 

const { Title, Text } = Typography;

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const url = "http://localhost:5000/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      message.success(res.message);
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        console.log("error.response.data: " + error.response.data)
        console.log(" error.response.status: "+  error.response.status)
        setError(error.response.data.message);
        message.error(error.response.data.message);
      }
    }
  };

  return (
    <Row justify="center" align="middle" className="signup-container">
      <Col xs={22} sm={18} md={12} lg={8} xl={10} className="signup-form-container">
        <Row justify="center" className="form-row">
          <Col span={24}>
            <Form layout="vertical" onFinish={handleSubmit}>
              <Title level={2} className="form-title">Create Account</Title>

              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: "Please input your first name!" }]}
              >
                <Input
                  placeholder="First Name"
                  name="firstName"
                  onChange={handleChange}
                  value={data.firstName}
                />
              </Form.Item>

              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: "Please input your last name!" }]}
              >
                <Input
                  placeholder="Last Name"
                  name="lastName"
                  onChange={handleChange}
                  value={data.lastName}
                />
              </Form.Item>

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
                <Button type="primary" htmlType="submit" block className="signup-btn-filled">
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>

        <Row justify="center" className="form-row">
          <Col span={24} className="text-center">
            <Text className="signin-text">Already have an account? </Text>
            <Link to="/login">
              <Button type="default" block className="signup-btn-outlined">
                Sign In
              </Button>
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>

  );
};

export default Signup;
