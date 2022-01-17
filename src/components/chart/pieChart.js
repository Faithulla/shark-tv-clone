import axios from "axios";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
const Piechart = () => {
  const [count1, setCount1] = useState([]);
  const [count2, setCount2] = useState([]);
  const [count3, setCount3] = useState([]);
  const getUsersCount = () => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        setCount1(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getSubsCount = () => {
    axios
      .get("http://localhost:5000/subs")
      .then((res) => {
        setCount2(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getMovieCount = () => {
    axios
      .get("http://localhost:5000/movies")
      .then((res) => {
        console.log(res.data);
        setCount3(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUsersCount();
    getSubsCount();
    getMovieCount();
  }, []);
  const data = [
    { name: "Users", value: count1.length },
    { name: "Subs", value: count2.length },
    { name: "Movies", value: count3.length },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer>
      <div
        style={{
          backgroundColor: "white",
          marginTop: "2vh",
          marginLeft: "-10vh",
          borderRadius: "5px",
          position: "relative",
          width: "13vw",
          height: "25vh",
        }}
      >
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="25%"
            cy="23%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
    </ResponsiveContainer>
  );
};

export default Piechart;
