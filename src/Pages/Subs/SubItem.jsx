import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Input } from "antd";
import { useParams } from "react-router-dom";


const SubItem = () => {
  const [subs, setSubs] = useState([]);
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");

  const { id } = useParams();
  const getUser = () => {
    axios.get(`http://localhost:5000/subs/?id=${id}`).then((res) => {
      console.log("res data", res.data);
      setSubs(res.data);
    });
  };
  const update = (e) => {
    axios
      .put(`http://localhost:5000/subs/${id}`, { type: type, duration: duration })
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
        {subs.map((item) => {
          return (
            <div className="container-card" key={item.id}>
              <Input
                bordered={false}
                className="input-name"
                placeholder={item.type}
                value={type}
                contentEditable="true"
                onChange={(e) => setType(e.target.value)}
                prefix={"Name :"}
              />
              <Input
                bordered={false}
                className="input-number"
                placeholder={item.duration}
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                prefix={`Duration :`}
              />
            </div>
          );
        })}
        <Button onClick={update}>Update</Button>
      </Card>
    </div>
  );
};

export default SubItem;
