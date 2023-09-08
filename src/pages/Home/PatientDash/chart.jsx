import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";


const LineChartComponent = ({ data1, data2, months }) => {
  let line_data1 = [];

  for (let i = 0; i < months.length; i++) {
    line_data1.push({ name: months[i], months: data1[i] });
  }

  let line_data2 = [];

  if (data2) {
    for (let i = 0; i < months.length; i++) {
      line_data2.push({ name: months[i], months: data2[i] });
    }
  }

  return (
    <LineChart
      width={350}
      height={300}
      data={line_data1}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis range={[0, 200]} />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="months"
        stroke="#8884d8"
      />
      {data2 && (
        <Line
          type="monotone"
          dataKey="months"
          stroke="#82ca9d"
          data={line_data2}
        />
      )}
    </LineChart>
  );
};

export default LineChartComponent;
