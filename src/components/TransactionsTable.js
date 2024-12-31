import React, { useEffect, useState } from "react";
import axios from "axios";

const TransactionsTable = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, [month, search]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/transaction"
      );
      const filteredData = response.data.filter((item) =>
        new Date(item.dateOfSale).toLocaleString("default", { month: "long" }) ===
          month &&
        (item.title.includes(search) ||
          item.description.includes(search) ||
          item.price.toString().includes(search))
      );
      setTransactions(filteredData);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search transactions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table border={2}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th>Sold</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id}>
              <td>{txn.title}</td>
              <td>{txn.description}</td>
              <td>${txn.price}</td>
              <td> 
                { 
                  <img 
                    src={txn.image}
                    alt="No found" 
                    width="50" 
                    height="50" 
                  />
                }
              </td>
              <td>{txn.sold ? "Yes" : "No"}</td>
              <td>{new Date(txn.dateOfSale).toLocaleDateString()}</td>
             </tr> 
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
