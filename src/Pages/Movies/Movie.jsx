import { Table } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Movie = () => {
  const history = useNavigate();
  const addMovie = () => {
    axios
      .post("http://localhost:5000/movies", {
        name: "Matrix",
        genre: "Fiction",
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [movies, setMovies] = useState([]);
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
      title: "Genre",
      dataIndex: "genre",
      key: "3",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "4",
      render: () => {
        return (
          <>
            <EditOutlined onClick={(e) => history("/movie/list/id")} />
            <DeleteOutlined
              style={{ marginLeft: "14px", color: "red", fontSize: "15px" }}
            />
          </>
        );
      },
    },
  ];
  return (
    <div>
      <Table bordered columns={columns} dataSource={movies}></Table>
      <button onClick={addMovie}>addMovie</button>
    </div>
  );
};

export default Movie;
