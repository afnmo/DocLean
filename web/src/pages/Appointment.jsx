import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircleFilled, InfoCircleFilled } from "@ant-design/icons";
import { Row, Col, Button, Avatar, Tag, message } from "antd";
import "styles/Appointment.css";

const Appointment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [patientId, setPatientId] = useState(null);
  // eslint-disable-next-line
  const [appointment, setAppointment] = useState({
    doctorId: docId,
    patientId: null,
    slotDate: "",
    slotTime: "",
  });

  const checkAuth = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/check", {
        withCredentials: true,
      });
      if (response.status === 200) setPatientId(response.data.userId);
    } catch (error) {
      console.error("Authentication check failed:", error);
    }
  }, []);

  const fetchDocInfo = useCallback(async () => {
    try {
      const response = await fetch(`/api/doctors/${docId}`);
      if (!response.ok) throw new Error("Failed to fetch doctor data");
      const data = await response.json();
      setDocInfo(data);
      formatSlots(data.slots);
    } catch (error) {
      console.error("Error fetching doctor info:", error);
    }
  }, [docId]);

  const formatSlots = (slots) => {
    const formattedSlots = slots.map((slot) => ({
      date: slot.date,
      day: slot.day.toUpperCase(),
      times: slot.times,
    }));
    setDocSlots(formattedSlots);
  };

  useEffect(() => {
    if (patientId) {
      setAppointment((prev) => ({ ...prev, patientId }));
    }
  }, [patientId]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchDocInfo();
      setLoading(false);
    };
    checkAuth();
    fetchData();
  }, [checkAuth, fetchDocInfo]);

  const bookAppointment = async () => {
    if (!slotTime) {
      message.error("Please select a time slot");
      return;
    }

    const selectedDate = docSlots[slotIndex]?.date;
    const newAppointment = {
      doctorId: docId,
      patientId,
      slotDate: selectedDate,
      slotTime,
    };

    try {
      const { data: res } = await axios.post("http://localhost:5000/api/appointments", newAppointment);
      navigate("/");
      message.success(res.message);
    } catch (error) {
      if (error.response?.status >= 400 && error.response?.status <= 500) {
        console.error("Error booking appointment:", error);
        message.error(error.response.data.message);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    docInfo && (
      <div className="appointment-container">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8} md={6}>
            <Avatar src={require(`../${docInfo.image}`)} size={200} shape="square" />
          </Col>
          <Col xs={24} sm={16} md={18}>
            <h2>
              {docInfo.name} <CheckCircleFilled />
            </h2>
            <Tag color="blue">
              {docInfo.degree} - {docInfo.speciality}
            </Tag>
            <p>Experience: {docInfo.experience}</p>
            <h3>
              About <InfoCircleFilled />
            </h3>
            <p>{docInfo.about}</p>
            <p>
              Appointment fee: <strong>{docInfo.fees}</strong>
            </p>

            {/* Booking Slots Section */}
            <div className="slot-section">
              <h3>Booking slots</h3>
              <div className="slot-days">
                {docSlots.map((item, index) => (
                  <Button
                    key={index}
                    type={slotIndex === index ? "primary" : "default"}
                    onClick={() => setSlotIndex(index)}
                    className="slot-day-button"
                  >
                    {`${item.day} ${new Date(item.date).getDate()}`}
                  </Button>
                ))}
              </div>

              {/* Time Slots */}
              <div className="slot-time-buttons">
                {docSlots[slotIndex]?.times.length ? (
                  docSlots[slotIndex].times.map((time, index) => (
                    <Button
                      key={index}
                      type={time === slotTime ? "primary" : "default"}
                      onClick={() => setSlotTime(time)}
                      className="slot-time-button"
                    >
                      {time.toLowerCase()}
                    </Button>
                  ))
                ) : (
                  <p>No slots available</p>
                )}
              </div>
            </div>

            {/* Book Appointment Button */}
            <div className="book-appointment">
              <Button type="primary" size="large" onClick={bookAppointment}>
                Book an appointment
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    )
  );
};

export default Appointment;



// import React, { useEffect, useState, useCallback } from "react";
// import { useParams } from "react-router-dom";
// import { doctorsData } from "assets/assets";
// import { CheckCircleFilled, InfoCircleFilled } from "@ant-design/icons";
// import { Row, Col, Button, Avatar, Tag } from "antd";
// import "styles/Appointment.css";

// const Appointment = () => {
//   const { docId } = useParams();
//   const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

//   const [docInfo, setDocInfo] = useState(null);
//   const [docSlots, setDocSlots] = useState([]);
//   const [slotIndex, setSlotIndex] = useState(0);
//   const [slotTime, setSlotTime] = useState("");
//   const [loading, setLoading] = useState(true); // Loading state

//   const fetchDocInfo = useCallback(async () => {
//     const docInfo = doctorsData.find((doc) => doc._id === docId);
//     setDocInfo(docInfo);
//   }, [docId]);

//   const getAvailableSlots = async () => {
//     setDocSlots([]);
//     let allSlots = [];
//     let today = new Date();

//     for (let i = 0; i < 7; i++) {
//       let currentDate = new Date(today);
//       currentDate.setDate(today.getDate() + i);

//       let endTime = new Date(currentDate);
//       endTime.setHours(21, 0, 0, 0);

//       if (i === 0) {
//         let currentHour = new Date().getHours();
//         currentDate.setHours(currentHour >= 10 ? currentHour + 1 : 10);
//         currentDate.setMinutes(0);
//       } else {
//         currentDate.setHours(10);
//         currentDate.setMinutes(0);
//       }

//       let timeSlots = [];
//       while (currentDate < endTime) {
//         let formattedTime = currentDate.toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         });

//         timeSlots.push({
//           dateTime: new Date(currentDate),
//           time: formattedTime,
//         });

//         currentDate.setMinutes(currentDate.getMinutes() + 30);
//       }

//       allSlots.push(timeSlots);
//     }

//     setDocSlots(allSlots);
//   };

//   useEffect(() => {
//     setLoading(true);
//     fetchDocInfo();
//     setLoading(false);
//   }, [fetchDocInfo]);

//   useEffect(() => {
//     if (docInfo) getAvailableSlots();
//   }, [docInfo]);

//   const bookAppointment = () => {
//     if (!slotTime) {
//       alert("Please select a time slot.");
//       return;
//     }
//     // Booking logic can be added here
//     alert(`Appointment booked with ${docInfo.name} at ${slotTime}.`);
//   };

//   if (loading) {
//     return <div>Loading...</div>; // Simple loading state
//   }

//   return (
//     docInfo && (
//       <div className="appointment-container">
//         <Row gutter={[16, 16]}>
//           <Col xs={24} sm={8} md={6}>
//             <Avatar src={docInfo.image} size={200} shape="square" />
//           </Col>
//           <Col xs={24} sm={16} md={18}>
//             <h2>
//               {docInfo.name} <CheckCircleFilled />
//             </h2>
//             <Tag color="blue">
//               {docInfo.degree} - {docInfo.speciality}
//             </Tag>
//             <p>Experience: {docInfo.experience}</p>
//             <h3>
//               About <InfoCircleFilled />
//             </h3>
//             <p>{docInfo.about}</p>
//             <p>
//               Appointment fee: <strong>{docInfo.fees}</strong>
//             </p>

//             {/* Booking Slots Section */}
//             <div className="slot-section">
//               <h3>Booking slots</h3>
//               <div className="slot-days">
//                 {docSlots.length > 0 &&
//                   docSlots.map((item, index) => (
//                     <Button
//                       key={index}
//                       type={slotIndex === index ? "primary" : "default"}
//                       onClick={() => setSlotIndex(index)}
//                       className="slot-day-button"
//                     >
//                       <div>{daysOfWeek[item[0].dateTime.getDay()]}</div>
//                       <div>{item[0].dateTime.getDate()}</div>
//                     </Button>
//                   ))}
//               </div>

//               {/* Time Slots */}
//               <div className="slot-time-buttons">
//                 {docSlots.length > 0 &&
//                 docSlots[slotIndex] &&
//                 docSlots[slotIndex].length > 0 ? (
//                   docSlots[slotIndex].map((item, index) => (
//                     <Button
//                       key={index}
//                       type={item.time === slotTime ? "primary" : "default"}
//                       onClick={() => setSlotTime(item.time)}
//                       className="slot-time-button"
//                     >
//                       {item.time.toLowerCase()}
//                     </Button>
//                   ))
//                 ) : (
//                   <p>No slots available</p>
//                 )}
//               </div>
//             </div>

//             {/* Book Appointment Button */}
//             <div className="book-appointment">
//               <Button type="primary" size="large" onClick={bookAppointment}>
//                 Book an appointment
//               </Button>
//             </div>
//           </Col>
//         </Row>
//       </div>
//     )
//   );
// };

// export default Appointment;
