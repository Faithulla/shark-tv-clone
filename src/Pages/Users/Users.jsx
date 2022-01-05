import { Table, Modal, Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {UserOutlined,PhoneOutlined} from "@ant-design/icons";
const Users = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState([]);
  const [number, setNumber] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const history = useNavigate();
  const consol = (e) => {
    console.log("yeeee");
    history("/users/list/id");
  };
  const showModal = () => {
    setIsModalVisible(true);
    handleAddUser();
  };

  const handleOk = () => {
    setIsModalVisible(false);

  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
 const handleAddUser = () => {
  axios
  .post("http://localhost:5000/users")({
    name,
    number
  })
  .then(res => {
    console.log("posted",res.data)
    
  })
  .catch(err => {
    console.log("error");
  })
}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async (e) => {
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
        return (
          <>
            <EditOutlined onClick={(e) => consol(e)} />
            <DeleteOutlined />
          </>
        );
      },
    },
  ];
  return (
    <div>
      <Table bordered columns={columns} dataSource={data}></Table>
      <Modal title='FILL THE FORM BELOW' visible={isModalVisible} onCancel={handleCancel} onOk={handleOk}>
       <Input prefix={<UserOutlined/>} placeholder='Name' onChange={(e) => setName(e.target.value)} style={{marginBottom: '10px'}}/>
       <Input prefix={<PhoneOutlined/>} placeholder='Phone Number' onChange={(e) => setNumber(e.target.value)}/>
      </Modal>
      <Button onClick={showModal}>ADD USER</Button>
    </div>
  );
};

export default Users;
