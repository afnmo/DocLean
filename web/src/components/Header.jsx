

import { Button, Row, Col, Typography } from 'antd';
import { assets } from 'assets/assets';
import React from 'react';
import 'styles//Header.css'; 

const { Title, Text } = Typography;

const Header = () => {
  return (
    <div className="header-container">
      <Row gutter={[16, 24]} align="middle" justify="center">
        <Col xs={24} md={12} className="text-container">
          <Title level={1} className="header-title">
            Book Appointment <br /> With Trusted Doctors
          </Title>
          <div className="doctor-info">
            {/* <img src='' alt="" className="doctor-image" /> */}
            <Text className="doctor-text">
              Simply browse through our extensive list of trusted doctors, <br />
              schedule your appointment hassle-free.
            </Text>
          </div>
          <Button
            href="#speciality"
            type="primary"
            shape="round"
            className="book-button"
          >
            Book appointment
          </Button>
        </Col>

        <Col xs={24} md={12} className="image-container">
        <img src={assets.doctors} alt=""className="header-image"  />

        </Col>
      </Row>
    </div>
  );
};

export default Header;
