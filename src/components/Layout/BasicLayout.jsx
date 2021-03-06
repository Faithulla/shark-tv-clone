import React from "react";
import { Input, Layout, Menu } from "antd";
import { Link, Route, Routes } from "react-router-dom";
import "./style.css";
import {
  PieChartOutlined,
  UserOutlined,
  YoutubeOutlined,
  HeatMapOutlined,
  SearchOutlined,
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
            <Link to="/"></Link>
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
        <Header className="site-layout-background" style={{ padding: "0px" }}>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search"
            style={{ width: "20%", marginLeft: "15px", borderRadius: "5px" }}
          />
        </Header>
        <Content style={{ margin: "0 16px", marginTop: "10px" }}>
          <Routes>
            {routes.map((route) => (
              <Route
                path={route.path}
                element={route.element}
                key={route.key}
              ></Route>
            ))}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Basiclayout;
