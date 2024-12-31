import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const BarChartComponent = ({ month }) => {
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    fetchBarData();
  }, [month]);

  const fetchBarData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/transaction"
      );
      const filteredData = response.data.filter((item) =>
        new Date(item.dateOfSale).toLocaleString("default", { month: "long" }) ===
        month
      );

      const ranges = Array(10).fill(0);
      filteredData.forEach((item) => {
        const index = Math.min(Math.floor(item.price / 100), 9);
        ranges[index]++;
      });

      setBarData(
        ranges.map((count, i) => ({
          range: `${i * 100}-${i * 100 + 99}`,
          count,
        }))
      );
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
    }
  };

  return (
    <BarChart width={600} height={300} data={barData}>
      <XAxis dataKey="range" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
};

export default BarChartComponent;
