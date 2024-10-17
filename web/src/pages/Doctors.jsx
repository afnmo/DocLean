import React, { useEffect, useState, useCallback } from "react";
import { doctorsData } from "assets/assets";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Col, Row, Button, Typography, Layout } from "antd";
import "styles/Doctors.css";
const { Text } = Typography;
const { Sider, Content } = Layout;

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [activeSpeciality, setActiveSpeciality] = useState(speciality || "");
  const navigate = useNavigate();

  const applyFilter = useCallback(() => {
    if (speciality) {
      setFilterDoc(doctorsData.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctorsData);
    }
  }, [speciality]);

  useEffect(() => {
    applyFilter();
    setActiveSpeciality(speciality || ""); 
  }, [applyFilter, speciality]); 

  return (
    <Layout className="doctors-page">
      <Sider width={250} className="sidebar">
        <Text type="secondary" className="filter-title">
          Browse by Speciality
        </Text>
        <div className="specialities-list">
          {[
            "General Physician",
            "Cardiology",
            "Dermatology",
            "Pediatrics",
            "Orthopedics",
            "Neurology",
          ].map((spec) => (
            <Button
              key={spec}
              onClick={() => {
                speciality === spec
                  ? navigate("/doctors")
                  : navigate(`/doctors/${spec}`);
                setActiveSpeciality(spec); 
              }}
              className={`speciality-btn ${activeSpeciality === spec ? 'active' : ''}`} // Add active class when selected
              block
            >
              {spec}
            </Button>
          ))}
        </div>
      </Sider>

      <Layout className="content-area">
        <Content className="doctors-content">
          <Row gutter={[16, 16]} className="doctor-grid">
            {filterDoc.map((item, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  className="doctor-card"
                  cover={
                    <img
                      className="doctor-image"
                      alt={item.name}
                      src={item.image}
                    />
                  }
                  onClick={()=>navigate(`/appointment/${item._id}`)}
                >
                  <Card.Meta title={item.name} description={item.speciality} />
                  <Text type="success" className="availability-status">
                    Available
                  </Text>
                </Card>
              </Col>
            ))}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Doctors;
