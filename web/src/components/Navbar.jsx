import React, { useState, useEffect } from "react";
import { Menu, Layout, Button, Drawer, Avatar } from "antd";
import {
  MenuOutlined,
  UserOutlined,
  CodeOutlined,
} from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";
import "styles/Navbar.css";
import { assets } from "assets/assets";
import axios from "axios";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  // const [token, setToken] = useState(!!localStorage.getItem("token"));
  const [activeMenuItem, setActiveMenuItem] = useState("/");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/check", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setIsAuthenticated(true);
        console.log("User is authenticated");
      } else {
        setIsAuthenticated(false);
        console.log("User is not authenticated");
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );

      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  const showDrawer = () => {
    setVisible(!visible);
  };

  const location = useLocation();

  //   useEffect(() => {
  //     checkAuth();
  // }, []);

  useEffect(() => {
    checkAuth();
    setActiveMenuItem(location.pathname);
    setVisible(false);
  }, [location]);

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <nav className="navbar">
      <Layout>
        <Layout.Header className="nav-header">
          <div className="logo">
            <img src={assets.logo} alt="logo" className="logo-img" />
          </div>
          <div className="navbar-menu">
            <div className="leftMenu">
              <Menu mode={"horizontal"} selectedKeys={[activeMenuItem]}>
                <Menu.Item key="/">
                  <NavLink to="/" activeClassName="active-link">
                    HOME
                  </NavLink>
                </Menu.Item>
                {!isAuthPage ? (
                  <>
                    <Menu.Item key="/doctors">
                      <NavLink to="/doctors" activeClassName="active-link">
                        ALL DOCTORS
                      </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/about">
                      <NavLink to="/about" activeClassName="active-link">
                        ABOUT
                      </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/contact">
                      <NavLink to="/contact" activeClassName="active-link">
                        CONTACT
                      </NavLink>
                    </Menu.Item>
                  </>
                ) : null}

                {isAuthPage && (
                  <>
                    <Menu.Item key="/login">
                      <NavLink to="/login" activeClassName="active-link">
                        LOGIN
                      </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/signup">
                      <NavLink to="/signup" activeClassName="active-link">
                        SIGN UP
                      </NavLink>
                    </Menu.Item>
                  </>
                )}
              </Menu>
            </div>

            <Button
              className="menuButton"
              type="text"
              onClick={showDrawer}
              aria-label="Menu"
            >
              <MenuOutlined />
            </Button>

            <div className="rightMenu">
              {isAuthenticated ? (
                <Menu mode={"horizontal"}>
                  {/* Right Menu Items */}
                  <Menu.SubMenu
                    key="user-menu"
                    title={
                      <>
                        <Avatar icon={<UserOutlined />} />
                        <span className="username">John Doe</span>
                      </>
                    }
                  >
                    <Menu.Item key="profile">My Profile</Menu.Item>
                    <Menu.Item key="appointments">My Appointments</Menu.Item>
                    <Menu.Item key="logout" onClick={handleLogout}>
                      Logout
                    </Menu.Item>
                  </Menu.SubMenu>
                </Menu>
              ) : !isAuthPage ? (
                <Button type="primary" style={{ marginRight: "10px" }}>
                  <NavLink to="/login">Create Account</NavLink>
                </Button>
              ) : null}
            </div>

            <Drawer
              title={"DocLean"}
              placement="right"
              closable={true}
              onClose={showDrawer}
              open={visible}
              style={{ zIndex: 99999 }}
              maskClosable={true}
              width={300}
            >
              <Menu mode={"inline"} selectedKeys={[activeMenuItem]}>
                <Menu.Item key="/">
                  <NavLink to="/" activeClassName="active-link">
                    Home
                  </NavLink>
                </Menu.Item>
                {!isAuthPage ? (
                  <>
                    <Menu.Item key="/doctors">
                      <NavLink to="/doctors" activeClassName="active-link">
                        ALL DOCTORS
                      </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/about">
                      <NavLink to="/about" activeClassName="active-link">
                        ABOUT
                      </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/contact">
                      <NavLink to="/contact" activeClassName="active-link">
                        CONTACT
                      </NavLink>
                    </Menu.Item>
                  </>
                ) : null}

                {isAuthPage ? (
                  <>
                    <Menu.Item key="/login">
                      <NavLink to="/login" activeClassName="active-link">
                        Login
                      </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/signup">
                      <NavLink to="/signup" activeClassName="active-link">
                        Sign Up
                      </NavLink>
                    </Menu.Item>
                  </>
                ) : null}

                {/* Right Menu Items in Drawer */}
                {isAuthenticated ? (
                  <Menu.SubMenu
                    key="user-menu"
                    title={
                      <>
                        <Avatar icon={<UserOutlined />} />
                        <span className="username">John Doe</span>
                      </>
                    }
                  >
                    <Menu.Item key="project">
                      <CodeOutlined /> Projects
                    </Menu.Item>
                    <Menu.Item key="profile">
                      <UserOutlined /> Profile
                    </Menu.Item>
                    <Menu.Item key="logout" onClick={handleLogout}>
                      Logout
                    </Menu.Item>
                  </Menu.SubMenu>
                ) : (
                  <Menu.Item key="create-account">
                    <NavLink to="/login">Create Account</NavLink>
                  </Menu.Item>
                )}
              </Menu>
            </Drawer>
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
};

export default Navbar;
