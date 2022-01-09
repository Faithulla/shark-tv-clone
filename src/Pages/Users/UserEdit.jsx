import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Input, Tabs } from "antd";
import { Link, useParams } from "react-router-dom";

import "./input.css";
import Usermovies from "./UserMovies";

const Useredit = () => {
  const TabPane = Tabs.TabPane;
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const { id } = useParams();

  const getUser = () => {
    axios.get(`http://localhost:5000/users/?id=${id}`).then((res) => {
      console.log("res data", res.data);
      setData(res.data);
    });
  };
  const handleUpdate = (e) => {
    axios
      .put(`http://localhost:5000/users/${id}`, { name: name, number: number })
      .then((res) => {
        console.log("res data", res.data);
      })
      .catch((err) => {
        console.log("not updated", err);
      })
      .finally(() => {});
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Tabs defaultActiveKey="0" type="card">
        <TabPane tab="Card Tab 1" key="1">
          <Card
            title={`User ID : ${id} `}
            bordered={false}
            style={{ width: 600, height: 300 }}
          >
            {data.map((item) => {
              return (
                <div className="container-card" key={item.id}>
                  <Input
                    bordered={false}
                    className="input-name"
                    defaultValue={item.name}
                    onChange={(e) => setName(e.target.value)}
                    prefix={"Name :"}
                    required
                  />
                  <Input
                    bordered={false}
                    className="input-number"
                    defaultValue={item.number}
                    onChange={(e) => setNumber(e.target.value)}
                    prefix={`Number :`}
                    required
                  />
                </div>
              );
            })}
            <Button>
              <Link to="users/list">Cancel</Link>
            </Button>
            <Button onClick={handleUpdate}>Update</Button>
          </Card>
        </TabPane>
        <TabPane tab="Card Tab 2" key="2">
          <Usermovies />
        </TabPane>
        <TabPane tab="Card Tab 3" key="3">
          Content of card tab 3
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Useredit;
