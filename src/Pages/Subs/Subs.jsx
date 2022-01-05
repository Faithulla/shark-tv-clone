import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const Subs = (props) => {
  const [subs, setSubs] = useState([]);
  const history = useNavigate();
  useEffect(() => {
    axios
    .get("http://localhost:5000/subs")
    .then(res => {
      console.log("Getted data",res.data);
      setSubs(res.data)
    })
    .catch(err => {
      console.log("err",err);
    })
  }, []);
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
      <button >add</button>
    </div>
  );
};

export default Subs;
