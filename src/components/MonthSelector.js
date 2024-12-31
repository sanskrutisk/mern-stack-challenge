import React, { useState } from "react";

const MonthSelector = ({ onMonthChange }) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const [selectedMonth, setSelectedMonth] = useState("March");

  const handleChange = (e) => {
    setSelectedMonth(e.target.value);
    onMonthChange(e.target.value);
  };

  return (
    <select value={selectedMonth} onChange={handleChange}>
      {months.map((month, index) => (
        <option key={index} value={month}>
          {month}
        </option>
      ))}
    </select>
  );
};

export default MonthSelector;
