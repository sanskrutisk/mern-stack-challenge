import React, { useState } from "react";
import MonthSelector from "./components/MonthSelector";
import TransactionsTable from "./components/TransactionsTable";
import StatisticsBox from "./components/StatisticsBox";
import BarChartComponent from "./components/BarChartComponent";
import PieChartComponent from "./components/PieChartComponent";

const App = () => {
  const [month, setMonth] = useState("March");

  return (
    <div>
      <MonthSelector onMonthChange={setMonth} />
      <StatisticsBox month={month} />
      <TransactionsTable month={month} />
      <BarChartComponent month={month} />
      <PieChartComponent month={month} />
    </div>
  );
};

export default App;

