import React, { useState, useEffect } from "react";

import { Typography, Button, Menu, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import icon from "../assets/cryptocurrency.png";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: "Cryptocurrencies",
      icon: <FundOutlined />,
      label: <Link to="/cryptocurrencies">Cryptocurrencies</Link>,
    },
    // {
    //   key: "Exchanges",
    //   icon: <MoneyCollectOutlined />,
    //   label: <Link to="/exchanges">Exchanges</Link>,
    // },
    // {
    //   key: "News",
    //   icon: <BulbOutlined />,
    //   label: <Link to="/news">News</Link>,
    // },
  ];

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">Cryptoverse</Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu((prev) => !prev)}
        >
          <MenuOutlined className="menu_icon" />
        </Button>
      </div>

      {activeMenu && (
        <Menu
          theme="dark"
          items={menuItems}
          className="mobile-menu"
          onClick={() => setActiveMenu((prev) => !prev)}
        />
      )}
      {activeMenu && (
        <Menu theme="dark" items={menuItems} className="desktop-menu" />
      )}
    </div>
  );
};

export default Navbar;
