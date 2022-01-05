import { Card, Col, Row } from "antd";
import React from "react";
import SimpleChart from "../../components/chart/simplechrt";
import {
  YoutubeOutlined,
  HeatMapOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./style.css";
const Home = () => {
  return (
    <div>
      <div className="cards">
        <Row gutter={16}>
          <Col span={8}>
            <Card
              title={<UserOutlined style={{ fontSize: "20px" }}/>}
              bordered={false}
              style={{ borderRadius: "5px", fontWeight: "bold" }}
            >
              Users : {"14"}
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title={<YoutubeOutlined style={{ fontSize: "20px" }} />}
              bordered={false}
              style={{ borderRadius: "5px" , fontWeight: "bold"  }}
            >
              Movies : {'20'}
            </Card>
          </Col>

          <Col span={8}>
            <Card
              title={ <HeatMapOutlined style={{ fontSize: "20px" }} />}
              bordered={false}
              style={{ borderRadius: "5px" , fontWeight: "bold"}}
            >
             Subscriptions : {'10'}
            </Card>
          </Col>
        </Row>
      </div>
      <div className="chart">
        <SimpleChart />
      </div>
    </div>
  );
};

export default Home;
