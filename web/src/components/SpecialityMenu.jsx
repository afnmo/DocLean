


import React from 'react';
import { Link } from 'react-router-dom';
import { specialityData } from 'assets/assets';
import { Typography, Row, Col, Space } from 'antd';
import 'styles/SpecialityMenu.css'; 

const { Title, Text } = Typography;

const SpecialityMenu = () => {

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth', 
        });
      };
  return (
    <div className="speciality-container" id="speciality">
      <Title level={3}>Find by Speciality</Title>
      <Text className="speciality-description">
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </Text>

      <Row gutter={[8, 8]} justify="center" className="speciality-row"> 
        {specialityData.map((item, index) => (
          <Col key={index} xs={12} sm={8} md={6} lg={4}>
            <Link onClick={() => scrollToTop()} to={`/doctors/${item.speciality}`}>
              <Space direction="vertical" align="center" className="speciality-item">
                <div className="speciality-circle">
                  <img className="speciality-image" src={item.image} alt="" />
                </div>
                <Text>{item.speciality}</Text>
              </Space>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SpecialityMenu;
