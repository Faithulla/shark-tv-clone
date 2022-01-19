import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Input, Select, Tabs } from "antd";
import { Link, useParams } from "react-router-dom";

import Usermovies from "./UserStuff";

const Useredit = () => {
  const TabPane = Tabs.TabPane;
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [sex, setSex] = useState("");
  const { id } = useParams();

  const getUser = () => {
    axios.get(`http://localhost:5000/users/?id=${id}`).then((res) => {
      console.log("res data", res.data);
      setData(res.data);
    });
  };

  const handleUpdate = (e) => {
    axios
      .put(`http://localhost:5000/users/${id}`, {
        name: name,
        number: number,
        sex: sex,
      })
      .then((res) => {
        console.log("res data", res.data);
      })
      .catch((err) => {
        console.log("not updated", err);
      });
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
    console.log("Name int", e.target.value);
  };
  const handleChangeNumber = (e) => {
    setNumber(e.target.value);
    console.log("number int", e.target.value);
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Tabs defaultActiveKey="0" type="card">
        <TabPane tab="User" key="1">
          <Card
            title={`User ID : ${id} `}
            bordered={false}
            style={{ width: 600, height: 300, marginTop: "-25px" }}
          >
            {data.map((item) => {
              return (
                <div className="container-card" key={item.id}>
                  <Input
                    bordered={false}
                    style={{ marginBottom: "10px" }}
                    defaultValue={item.name}
                    onChange={handleChangeName}
                    prefix={"Name :"}
                    required
                  />
                  <Input
                    bordered={false}
                    style={{ marginBottom: "10px" }}
                    defaultValue={item.number}
                    onChange={handleChangeNumber}
                    prefix={`Number :`}
                    required
                  />
                  <Select defaultValue={item.sex} onChange={(e) => setSex(sex)}>
                    <Select.Option value="Male">Male</Select.Option>
                    <Select.Option value="Female">Female</Select.Option>
                  </Select>
                </div>
              );
            })}
            <Button>
              <Link to="users/list">Cancel</Link>
            </Button>
            <Button onClick={handleUpdate}>Update</Button>
          </Card>
        </TabPane>
        <TabPane tab="Subscriptions" key="2">
          <Usermovies />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Useredit;
