// import { doctorsData } from "assets/assets";
// import React from "react";

// const TopDoctors = () => {
//   return (
//     <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
//       <h1 className="text-3xl font-mediu">Top Doctors to Book</h1>
//       <p className="sm:w-1/3 text-center text-sm">
//         Simply browse through our extensive list of trusted doctors, schedule
//         your appointment hassle-free.
//       </p>
//       <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
//         {doctorsData.slice(0, 10).map((item, index) => (
//           <div className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
//             <img className="bg-blue-50" src={item.image} alt=""/>
//             <div className="pt-4">
//               <div className="flex items-center gap-2 text-sm text-center text-green-500"></div>
//               <p className="w-2 h-2 bg-green-500 rounded-full"></p> <p>Available</p>
//             </div>
//             <p>{item.name}</p>
//             <p>{item.speciality}</p>
//           </div>
//         ))}
//       </div>
//       <button>more</button>
//     </div>
//   );
// };

// export default TopDoctors


import React from "react";
import { doctorsData } from "assets/assets";
import { Typography, Row, Col, Card, Button } from "antd";
import 'styles/TopDoctors.css';  
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const TopDoctors = () => {
    
  const navigate = useNavigate()
 
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', 
    });
  };

  return (
    <div className="top-doctors-container">
      <Title level={4}>Top Doctors to Book</Title>  
      <Text className="top-doctors-description">
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </Text>

      <Row gutter={[12, 18]} justify="center" className="top-doctors-grid">
        {doctorsData.slice(0, 10).map((item, index) => (
          <Col key={index} xs={12} sm={8} md={6} lg={6}> 
            <Card
              hoverable
              className="doctor-card"
              cover={
                <img
                  alt={item.name}
                  src={item.image}
                  className="doctor-image"
                  style={{ height: '120px', objectFit: 'cover', background: '#E6F7FF' }} 
                />
              }
              onClick={()=>navigate(`/appointment/${item._id}`)}
            >
              <div className="doctor-availability">
                <div className="status-indicator"></div>
                <Text className="availability-text">Available</Text>
              </div>
              <Text strong>{item.name}</Text>
              <br />
              <Text type="secondary">{item.speciality}</Text>
            </Card>
          </Col>
        ))}
      </Row>

      <Button onClick={()=>{navigate('/doctors'); scrollToTop()}}
      type="primary" size="middle" className="more-button"> 
        More
      </Button>
    </div>
  );
};

export default TopDoctors;
