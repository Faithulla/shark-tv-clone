import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Breadcrumb, Button, Input, Popconfirm, Select, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { YoutubeFilled } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
const Movie = () => {
  const location = window.location.pathname;
  const history = useNavigate();

  const [movies, setMovies] = useState([]);
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [quality, setQuality] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const optionsData1 = [
    {
      value: "Action",
      label: "Action",
    },
    {
      value: "Comedy",
      label: "Comedy",
    },
    {
      value: "Drama",
      label: "Drama",
    },
    {
      value: "Horror",
      label: "Horror",
    },
  ];
  const optionsData2 = [
    {
      value: "1080,720,480",
      label: "All",
    },
    {
      value: "1080p",
      label: "1080p",
    },
    {
      value: "720p",
      label: "720p",
    },
    {
      value: "480p",
      label: "480p",
    },
  ];
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/movies/${id}`)
      .then((res) => {
        console.log("id", id);
        setMovies(movies.filter((item) => item.id !== id));
      })
      .catch((err) => {
        console.log("not deleted", err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/movies")
      .then((res) => {
        console.log(res.data);
        setMovies(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddMovie = () => {
    axios
      .post("http://localhost:5000/movies", {
        name,
        genre,
        quality,
      })
      .then((response) => {
        console.log("posted", response.data);
        setMovies([...movies, response.data]);
      })
      .catch((err) => {
        console.log("error");
      });
  };

  const handleChangeGenre = (value) => {
    setGenre(value);
  };
  const handleChangeQuality = (value) => {
    setQuality(value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    handleAddMovie();
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
      title: "Name",
      dataIndex: "name",
      key: "2",
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "3",
    },
    {
      title: "Quality",
      dataIndex: "quality",
      key: "5",
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
            <EditOutlined
              onClick={(e) => history(`/movie/list/${record.id}`)}
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
        pagination={{
          pageSize: 5,
        }}
        dataSource={movies.map((item) => ({
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
          prefix={<YoutubeFilled />}
          required
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Select
          defaultValue="Adventure"
          onChange={handleChangeGenre}
          options={optionsData1}
        ></Select>
        <Select
          defaultValue="1080p"
          onChange={handleChangeQuality}
          options={optionsData2}
        ></Select>
      </Modal>
      <Button onClick={showModal}>ADD MOVIE</Button>
    </div>
  );
};

export default Movie;
