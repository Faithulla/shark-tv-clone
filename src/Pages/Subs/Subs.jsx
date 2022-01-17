import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Breadcrumb, Button, Input, Popconfirm, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { DatabaseFilled, FieldTimeOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
const Subs = (props) => {
  const [subs, setSubs] = useState([]);
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [id, setId] = useState([]);
  const history = useNavigate();
  const location = window.location.pathname;
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/subs/${id}`)
      .then((res) => {
        console.log("id", id);
        setSubs(subs.filter((item) => item.id !== id));
      })
      .catch((err) => {
        console.log("not deleted", err);
      });
  };

  const addSub = () => {
    axios
      .post("http://localhost:5000/subs", {
        type,
        duration,
      })
      .then((res) => {
        console.log(res.data);
        setSubs([...subs, res.data]);
      })
      .catch((err) => {
        console.log("error");
      });
  };

  useEffect((e) => {
    axios
      .get(`http://localhost:5000/subs`)
      .then((res) => {
        console.log("recived data", res.data);
        setSubs(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    addSub();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "No",
      dataIndex: "id",
      key: "1",
      width: "60px",
      align: "center",
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
      width: "106px",
      align: "center",
      render: (_, record) => {
        return (
          <>
            <EditOutlined onClick={(e) => history(`/subs/list/${record.id}`)} 
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
    <Breadcrumb >
      {location.split("/").map((item, index) => {
        return (
          <Breadcrumb.Item key={index}>
            {item}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
      <Table
        bordered
        columns={columns}
        pagination={{ pageSize: 5 }}
        dataSource={subs.map((item) => ({
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
          prefix={<DatabaseFilled />}
          required
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Input
          prefix={<FieldTimeOutlined />}
          required
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </Modal>
      <Button onClick={showModal}>ADD SUBS</Button>
    </div>
  );
};

export default Subs;
