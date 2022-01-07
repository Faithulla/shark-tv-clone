import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Input } from "antd";
import { useParams } from "react-router-dom";


const MovieEdit = () => {
  const [movies, setMovies] = useState([]);
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");

  const { id } = useParams();
  const getUser = () => {
    axios.get(`http://localhost:5000/movies/?id=${id}`).then((res) => {
      console.log("res data", res.data);
      setMovies(res.data);
    });
  };
  const update = (e) => {
    axios
      .put(`http://localhost:5000/movies/${id}`, { name: name, genre: genre })
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
        {movies.map((item) => {
          return (
            <div className="container-card" key={item.id}>
              <Input
                bordered={false}
                className="input-name"
                placeholder={item.name}
                value={name}
                contentEditable="true"
                onChange={(e) => setName(e.target.value)}
                prefix={"Name :"}
              />
              <Input
                bordered={false}
                className="input-number"
                placeholder={item.genre}
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                prefix={`Genre :`}
              />
            </div>
          );
        })}
        <Button onClick={update}>Update</Button>
      </Card>
    </div>
  );
};

export default MovieEdit;
