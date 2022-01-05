import { Table } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {EditOutlined,DeleteOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [data, setData] = useState([]);
  const history = useNavigate()
const consol = (e) => {
  console.log("yeeee");
  history("/users/list/id")
}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(data);

  const columns = [
    {
      title: "No",
      dataIndex: "id",
      key: "1",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "2",
    },
    {
      title: "Phone Number",
      dataIndex: "number",
      key: "3",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "4",
      render: () => {
        return <>
          <EditOutlined onClick={(e) => consol(e)}/>
          <DeleteOutlined/>
        </>
      }
    },
  ];
  return (
    <div>
      <Table bordered columns={columns} dataSource={data}></Table>
    </div>
  );
};

export default Users;
