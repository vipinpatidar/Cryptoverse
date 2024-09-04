import { useState } from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import {
  Navbar,
  Homepage,
  Cryptocurrencies,
  CryptoDetails,
  News,
} from "./components";

function App() {
  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout className="app-layout">
          <div className="routes">
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              {/* <Route exact path="/exchanges" element={<Exchanges />} /> */}
              <Route
                exact
                path="/cryptocurrencies"
                element={<Cryptocurrencies />}
              />
              <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
              {/* <Route exact path="/news" element={<News />} /> */}
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title level={4} style={{ color: "white" }}>
            Cryptoverse
            <br />
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            {/* <Link to="/news">News</Link> */}
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
