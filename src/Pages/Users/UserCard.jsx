import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Input, Select, Tabs } from "antd";
import { useParams, useNavigate } from "react-router-dom";

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
  const history = useNavigate();

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
      })
      .finally(history("/users/list"));
  };

  // const handleChangeName = (e) => {
  //   setName(e.target.value);
  //   console.log("Name int", e.target.value);
  // };
  // const handleChangeNumber = (e) => {
  //   setNumber(e.target.value);
  //   console.log("number int", e.target.value);
  // };
  const handleChange = (e) => {
    setName(e.target.value);
    setNumber(e.target.value);
    console.log("Na", e.target.value);
  };
  const handleChangeSex = (e) => {
    setSex(sex);
    console.log("Sex", e.target.value);
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
                <div
                  className="container-card"
                  key={item.id}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Input
                    style={{ marginBottom: "10px", width: "50%" }}
                    defaultValue={item.name}
                    onChange={handleChange}
                    prefix={"Name :"}
                    required
                  />
                  <Input
                    style={{ marginBottom: "10px", width: "50%" }}
                    defaultValue={item.number}
                    onChange={handleChange}
                    prefix={`Number :`}
                    required
                  />
                  <Select
                    defaultValue="Male"
                    onSelect={handleChangeSex}
                    style={{ width: "20%", marginBottom: "10px" }}
                  >
                    <Select.Option value="Male">Male</Select.Option>
                    <Select.Option value="Female">Female</Select.Option>
                  </Select>
                </div>
              );
            })}
            <Button onClick={() => history("/users/list")}>Cancel</Button>
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
