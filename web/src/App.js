import React from "react";
import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfie";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import AppFooter from "components/Footer";
import Signup from "pages/Signup";

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <>
    <div style={{ minHeight: "100vh" }}>
     {/* <Layout style={{ minHeight: "100vh" }}> */}
      {/* <Header style={{ background: "none" }}> */}
        <Navbar />
      {/* </Header> */}
       {/* <Content style={{ padding: "0 50px", flex: 1 }}> */}
       <div style={{ minHeight: "78vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:speciality" element={<Doctors />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/appointments" element={<MyAppointments />} />
          <Route path="/appointment/:docId" element={<Appointment />} />
        </Routes>
        </div>
       {/* </Content> */}

       {/* <Footer > */}
        <AppFooter />
      {/* </Footer> */}
     {/* </Layout> */}
     </div>
    </>
  );
};

export default App;
