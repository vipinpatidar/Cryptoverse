import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

import Loader from "./Loader";

const LineChart = ({ coinName, currentPrice, coinHistory, isHistory }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  // console.log(coinPrice, "Price");
  // console.log(coinTimestamp);
  if (isHistory) return <Loader />;

  return (
    <>
      <Row className="chart-header" style={{ marginTop: "2rem" }}>
        <Typography.Title level={2} className="chart-title">
          {coinName} Price Chart
        </Typography.Title>
        <Col className="price-container">
          <Typography.Title level={5} className="price-change">
            {coinHistory?.data?.change}%
          </Typography.Title>
          <Typography.Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Typography.Title>
        </Col>
      </Row>
      <Line data={data} />
    </>
  );
};

export default LineChart;
