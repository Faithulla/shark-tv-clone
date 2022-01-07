import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Input } from "antd";
import { useParams } from "react-router-dom";

import "./input.css";

const Useredit = () => {
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
  const update = (e) => {
    axios
      .put(`http://localhost:5000/users/${id}`, { name: name, number: number })
      .then((res) => {
        console.log("res data", res.data);
      })
      .catch((err) => {
        console.log("not updated", err);
      });
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
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
                placeholder={item.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                prefix={"Name :"}
              />
              <Input
                
                bordered={false}
                className="input-number"
                placeholder={item.number}
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                prefix={`Number :`}
              />
            </div>
          );
        })}
        <Button onClick={update}>Update</Button>
      </Card>
    </div>
  );
};

export default Useredit;
