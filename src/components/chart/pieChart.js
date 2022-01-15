import React from "react";
import { PieChart, Pie, Cell } from "recharts";
const Piechart = () => {
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={100}
          cy={120}
          innerRadius={50}
          outerRadius={80   }
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default Piechart;
