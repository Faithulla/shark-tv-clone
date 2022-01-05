import React from "react";
import { Layout, Menu } from "antd";
import { Link, Route, Routes } from "react-router-dom";
import "./style.css";
import {
  PieChartOutlined,
  UserOutlined,
  YoutubeOutlined,
  HeatMapOutlined,
} from "@ant-design/icons";
import { routes } from "../../Routes/routes";
const { Header, Content, Sider } = Layout;
const Basiclayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible theme="light">
        <div className="logo" />
        <Menu theme="light" defaultSelectedKeys={["0"]} mode="inline">
          <Menu.Item key={1}>
            <PieChartOutlined />
            <span>Home</span>
            <Link to="/dashboard"></Link>
          </Menu.Item>
          <Menu.Item key={2}>
            <UserOutlined />
            <span>Users</span>
            <Link to="/users/list"></Link>
          </Menu.Item>
          <Menu.Item key={3}>
            <YoutubeOutlined />
            <span>Movies</span>
            <Link to="/movie/list"></Link>
          </Menu.Item>
          <Menu.Item key={4}>
            <HeatMapOutlined />
            <span>Subscripton</span>
            <Link to="/subs/list"></Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
          
        <Content style={{ margin: "0 16px" }}>
          <Routes>
            {routes.map((route) => (
              <Route path={route.path} element={route.element} ></Route>
            ))}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Basiclayout;
