import { Popconfirm, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const Usermovies = () => {
  const [userMovies, setUserMovies] = useState([]);
  const { id } = useParams();
  const getUserMovies = () => {
    axios
      .get(`http://localhost:5000/users/${id}/movies`)
      .then((res) => {
        console.log("got it", res.data);
        setUserMovies(res.data);
      })
      .catch((err) => {
        console.log("404", err);
      });
  };
  useEffect(() => {
    getUserMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const columns = [
    {
      key: 0,
      title: "No",
      dataIndex: "id",
      width: "60px",
    },
    {
      key: 1,
      title: "Movies",
      dataIndex: "name",
    },
    {
      key: 2,
      title: "Genre",
      dataIndex: "genre",
    },
    {
      key: 3,
      title: "Actions",
      width: "100px",
      render: (_, record) => {
        return (
          <>
            <EditOutlined />
            <Popconfirm
              title="Sure?"
              
            >
              <DeleteOutlined
                style={{ marginLeft: "14px", color: "red", fontSize: "15px" }}
              />
            </Popconfirm>
          </>
        );
      },
    },
  ];
  return (
    <div>
      <Table
        bordered
        dataSource={userMovies.map((item) => {
            return { ...item, key: item.id };
        })}
        columns={columns}
        pagination={{ pageSize: 5 }}
      ></Table>
    </div>
  );
};

export default Usermovies;
