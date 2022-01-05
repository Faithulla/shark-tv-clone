import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const Subs = (props) => {
  const [subs, setSubs] = useState([]);
  const [id, setId] = useState([]);
  const history = useNavigate();
  useEffect(() => {
    axios
    .get(`http://localhost:5000/subs/${id}`)
    .then(res => {
      console.log("Getted data",res.data);
      setSubs(res.data)
    })
    .catch(err => {
      console.log("err",err);
    })
  }, [id]);
  const columns = [
    {
      title: "No",
      dataIndex: "id",
      key: "1",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "2",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "3",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "4",
      render: () => {
        return (
          <>
            <EditOutlined onClick={(e) => history("/subs/list/id")} />
            <DeleteOutlined />
          </>
        );
      },
    },
  ];
  return (
    <div>
      <Table bordered columns={columns} dataSource={subs}></Table>
      <Button >ADD SUBS</Button>
    </div>
  );
};

export default Subs;
