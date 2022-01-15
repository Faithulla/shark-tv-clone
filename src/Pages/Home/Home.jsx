import React, { useState, useEffect } from "react";
import axios from "axios";
import SimpleChart from "../../components/chart/simplechrt";
import "./style.css";

import { Card, Col, Row } from "antd";
import {
  YoutubeOutlined,
  HeatMapOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Piechart from "../../components/chart/pieChart";

const Home = () => {
  
  const [count1, setCount1] = useState([]);
  const [count2, setCount2] = useState([]);
  const [count3, setCount3] = useState([]);
  const getUsersCount = () => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        setCount1(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getSubsCount = () => {
    axios
      .get("http://localhost:5000/subs")
      .then((res) => {
        setCount2(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getMovieCount = () => {
    axios
      .get("http://localhost:5000/movies")
      .then((res) => {
        console.log(res.data);
        setCount3(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUsersCount();
    getSubsCount();
    getMovieCount();
  }, []);

  return (
    <div>
      <div className="cards">
        <Row gutter={16}>
          <Col span={8}>
            <Card
              prefix={<UserOutlined />}
              title={<UserOutlined style={{ fontSize: "20px" }} />}
              bordered={false}
              style={{ borderRadius: "5px", fontWeight: "bold" }}
            >
              Users : {count1.length}
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title={<HeatMapOutlined style={{ fontSize: "20px" }} />}
              bordered={false}
              style={{ borderRadius: "5px", fontWeight: "bold" }}
            >
              Subscriptions : {count2.length}
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title={<YoutubeOutlined style={{ fontSize: "20px" }} />}
              bordered={false}
              style={{ borderRadius: "5px", fontWeight: "bold" }}
            >
              Movies : {count3.length}
            </Card>
          </Col>
        <Piechart/>
        </Row>
        
      </div>
      <div className="chart">
        <SimpleChart />
      </div>
    </div>
  );
};

export default Home;
