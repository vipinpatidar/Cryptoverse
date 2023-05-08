import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import { useParams } from "react-router-dom";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import LineChart from "./LineChart";
import Loader from "./Loader";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimePeriod] = useState("7d");

  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory, isFetching: isHistory } = useGetCryptoHistoryQuery(
    {
      coinId,
      timeperiod,
    }
  );

  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <Loader />;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  // console.log(cryptoDetails);
  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetails?.["24hVolume"] && millify(cryptoDetails?.["24hVolume"])
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(cryptoDetails?.allTimeHigh.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(cryptoDetails?.supply.total)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(cryptoDetails?.supply.circulating)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  // console.log(genericStats);

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails.name} ({cryptoDetails.symbol}) Price
        </Title>
        <h3>
          {cryptoDetails.name} live price in us dollars. View values statistics,
          market cap and supply.
        </h3>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select Time Period"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((time) => (
          <Option key={time}>{time}</Option>
        ))}
      </Select>
      {/* line chart ////////////////////////////*/}
      <LineChart
        currentPrice={millify(cryptoDetails?.price)}
        coinName={cryptoDetails.name}
        coinHistory={coinHistory}
        isHistory={isHistory}
      />
      {/* line chart ////////////////////////////////*/}
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails.name} Value Statistics
            </Title>
            <h3>An overview showing the stats of {cryptoDetails.name}</h3>
          </Col>
          {stats.map(({ icon, title, value }, i) => (
            <Col className="coin-stats" key={i}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Title level={3} className="stats" style={{ marginLeft: "15px" }}>
                {value}
              </Title>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other Coins Statistics
            </Title>
            <h3>An overview showing the stats of all Cryptocurrencies</h3>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats" key={title}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Title level={3} className="stats" style={{ marginLeft: "15px" }}>
                {value}
              </Title>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <div className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {cryptoDetails.name}?
            <p style={{ marginTop: "10px", color: "#222", fontSize: "1rem" }}>
              {cryptoDetails.description}
            </p>
          </Title>
          <Title level={3} className="coin-details-heading">
            What is cryptocurrency?
            <p style={{ marginTop: "10px", color: "#222", fontSize: "1rem" }}>
              The first and obvious addition among cryptocurrency FAQs would
              turn the emphasis towards definition of cryptocurrencies.
              Cryptocurrency is basically a digital form of currency with the
              support of cryptographic security for conducting trusted
              transactions.
            </p>
          </Title>
          <Title level={3} className="coin-details-heading">
            What is blockchain?
            <p style={{ marginTop: "10px", color: "#222", fontSize: "1rem" }}>
              You could not find any list of cryptocurrency questions for
              beginners without the mention of blockchain. The first-ever
              cryptocurrency, Bitcoin, is the first successful implementation of
              blockchain in the real world. Blockchain technology is basically a
              transparent, publicly accessible, trustless, and secure ledger.
            </p>
          </Title>
          <Title level={3} className="coin-details-heading">
            What are public and private keys?
            <p style={{ marginTop: "10px", color: "#222", fontSize: "1rem" }}>
              The next important addition among best questions about crypto
              would draw attention towards the basic elements in working of
              cryptocurrencies. The primary foundation of Bitcoin and other
              notable cryptocurrencies is public-key cryptography.
            </p>
          </Title>
        </div>
        <Col className="coin-links">
          <Title level={2} className="coin-details-heading">
            {cryptoDetails.name} Links
          </Title>
          {cryptoDetails.links.map((link, i) => (
            <Row className="coin-link" key={i}>
              <Title level={5} className="link-name">
                {link.type}
              </Title>
              <a href={link.url} target="_blank">
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
