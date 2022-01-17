import { Table, Modal, Button, Input, Popconfirm, Breadcrumb } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { UserOutlined, PhoneOutlined } from "@ant-design/icons";

const Users = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const history = useNavigate();
  const location = window.location.pathname;

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    handleAddUser();
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (id) => {
    // console.log("id", id);
    axios
      .delete(`http://localhost:5000/users/${id}`)
      .then((res) => {
        console.log("id", id);
        setData(data.filter((item) => item.id !== id));
      })
      .catch((err) => {
        console.log("not deleted", err);
      });
  };
  const handleAddUser = () => {
    axios
      .post("http://localhost:5000/users", {
        name,
        number,
      })
      .then((response) => {
        console.log("posted", response.data);
        setData([...data, response.data]);
      })
      .catch((err) => {
        console.log("error");
      });
  };

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
      width: "60px",
      align: "center",
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
      dataIndex: "operation",
      key: "4",
      width: "106px",
      align: "center",

      render: (_, record) => {
        return (
          <>
            <EditOutlined
              onClick={(e) => history(`/users/list/${record.id}`)}
              style={{
                fontSize: "15px",
                border: "1px solid #d9d9d9",
                padding: "5px",
                
              }}
            />
            <Popconfirm
              title="Sure?"
              onConfirm={() => {
                handleDelete(record.id);
              }}
            >
              <DeleteOutlined
                style={{
                  marginLeft: "10px",
                  color: "red",
                  fontSize: "15px",
                  border: "1px solid #d9d9d9",
                  padding: "5px",
                }}
              />
            </Popconfirm>
          </>
        );
      },
    },
  ];
  return (
    <div>
      <Breadcrumb>
        {location.split("/").map((item, index) => {
          return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>;
        })}
      </Breadcrumb>
      <Table
        bordered
        columns={columns}
        pagination={{ pageSize: 5 }}
        dataSource={data.map((item) => ({
          ...item,
          key: item.id,
        }))}
      ></Table>
      <Modal
        title="FILL THE FORM BELOW"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <Input
          prefix={<UserOutlined />}
          required
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Input
          prefix={<PhoneOutlined />}
          required
          placeholder="Phone Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </Modal>
      <Button onClick={showModal}>ADD USER</Button>
    </div>
  );
};

export default Users;
