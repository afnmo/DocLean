import React, { useEffect, useState, useCallback } from "react";
import { Row, Col, Typography, Card, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import "styles/MyAppointments.css";

const { Title, Text } = Typography;

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patientId, setPatientId] = useState(null);

  const checkAuth = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/check", {
        withCredentials: true,
      });
      console.log(response);
      if (response.status === 200) {
        setPatientId(response.data.userId);
      }
    } catch (error) {
      console.error("Authentication check failed:", error);
    }
  }, []);

  const fetchAppointments = useCallback(async () => {
    console.log("Fetching appointments for patientId:", patientId);
    if (!patientId) return;
    try {
      const response = await fetch(`/api/appointments?patientId=${patientId}`);
      console.log(response);
      if (!response.ok) throw new Error("Failed to fetch appointments");
      const data = await response.json();
      console.log(data);
      setAppointments(data);
    } catch (error) {
      setError("Error fetching appointments");
      console.error("Error fetching appointments:", error);
    }
  }, [patientId]);

  const fetchDoctors = useCallback(async () => {
    try {
      const doctorIds = [...new Set(appointments.map((item) => item.doctorId))];
      const responses = await Promise.all(
        doctorIds.map((id) => fetch(`/api/doctors/${id}`))
      );
      const data = await Promise.all(responses.map((res) => res.json()));
      setDoctors(data);
    } catch (error) {
      setError("Error fetching doctors");
      console.error("Error fetching doctors:", error);
    }
  }, [appointments]);

  const deleteAppointment = useCallback(async (appointmentId) => {
    try {
      console.log("Deleting appointment with id:", appointmentId);
      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete the appointment");

      setAppointments((prevAppointments) =>
        prevAppointments.filter(
          (appointment) => appointment._id !== appointmentId
        )
      );

      const data = await response.json();
      console.log("Appointment deleted successfully:", data);
    } catch (error) {
      setError("Error deleting an appointment");
      console.error("Error deleting appointment:", error);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchAppointments();
      setLoading(false);
    };
    fetchData();
  }, [fetchAppointments]);

  useEffect(() => {
    if (appointments.length > 0) {
      fetchDoctors();
    }
  }, [appointments, fetchDoctors]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (appointments.length === 0) {
    return <p>No appointments available.</p>;
  }

  return (
    <div className="appointments-container">
      <Title level={3} className="appointments-title">
        My Appointments
      </Title>
      <div className="appointments-list">
        {appointments.map((item) => {
          const doctor = doctors.find((doc) => doc._id === item.doctorId);
          return (
            <Card key={item._id.$oid} className="appointment-card">
              <Row gutter={16}>
                <Col span={8}>
                  <div className="appointment-image-container">
                    {doctor && (
                      <img
                        className="appointment-image"
                        src={require(`../${doctor.image}`)}
                        alt={doctor.name}
                      />
                    )}
                  </div>
                </Col>
                <Col span={16}>
                  <div className="appointment-details">
                    {doctor ? (
                      <div className="appointment-header">
                        <Title level={4} className="doctor-name">
                          {doctor.name}
                        </Title>
                        <div className="appointment-icons">
                          <EditOutlined
                            className="icon-button"
                            onClick={() =>
                              message.success("Edit appointment clicked")
                            }
                          />
                          <DeleteOutlined
                            className="icon-button"
                            onClick={() => {
                              deleteAppointment(item._id);
                              message.error("Appointment canceled");
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <Text>Loading doctor info...</Text>
                    )}
                    <Text>
                      {doctor ? doctor.speciality : "Loading speciality..."}
                    </Text>
                    <div className="appointment-info">
                      <Text strong>Address:</Text>
                      <p>
                        {doctor ? doctor.address.line1 : "Loading address..."}
                      </p>
                      <p>{doctor ? doctor.address.line2 : ""}</p>
                      <p>
                        <Text strong>Date:</Text>{" "}
                        {new Date(item.slotDate).toLocaleDateString()} |
                        <Text strong> Time:</Text> {item.slotTime}
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MyAppointments;
