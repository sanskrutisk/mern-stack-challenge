import React, { useEffect, useState } from "react";
import axios from "axios";

const StatisticsBox = ({ month }) => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchStatistics();
  }, [month]);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/transaction"
      );
      const filteredData = response.data.filter((item) =>
        new Date(item.dateOfSale).toLocaleString("default", { month: "long" }) ===
        month
      );
      const totalSaleAmount = filteredData
        .filter((item) => item.sold)
        .reduce((sum, item) => sum + item.price, 0);
      const totalSoldItems = filteredData.filter((item) => item.sold).length;
      const totalNotSoldItems = filteredData.filter((item) => !item.sold).length;

      setStats({ totalSaleAmount, totalSoldItems, totalNotSoldItems });
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  return (
    <div>
      <h3>Statistics</h3>
      <p>Total Sale Amount: ${stats.totalSaleAmount || 0}</p>
      <p>Total Sold Items: {stats.totalSoldItems || 0}</p>
      <p>Total Not Sold Items: {stats.totalNotSoldItems || 0}</p>
    </div>
  );
};

export default StatisticsBox;
