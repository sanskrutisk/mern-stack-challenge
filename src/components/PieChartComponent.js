import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const PieChartComponent = ({ month }) => {
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    fetchPieData();
  }, [month]);

  const fetchPieData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/transaction"
      );
      const filteredData = response.data.filter((item) =>
        new Date(item.dateOfSale).toLocaleString("default", { month: "long" }) ===
        month
      );

      const categoryCounts = filteredData.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
      }, {});

      setPieData(
        Object.keys(categoryCounts).map((key) => ({
          name: key,
          value: categoryCounts[key],
        }))
      );
    } catch (error) {
      console.error("Error fetching pie chart data:", error);
    }
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={pieData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
      >
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;
