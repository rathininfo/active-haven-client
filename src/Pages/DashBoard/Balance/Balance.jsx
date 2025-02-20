import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const Balance = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [subscribers, setSubscribers] = useState(0);
  const [paidMembers, setPaidMembers] = useState(0);

  useEffect(() => {
    fetch("https://fitness-tracker-server-side-nine.vercel.app/paymentData")
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data.slice(-6));
        const balance = data.reduce(
          (acc, transaction) => acc + transaction.price,
          0
        );
        setTotalBalance(balance);
      });

    fetch("https://fitness-tracker-server-side-nine.vercel.app/subscriber")
      .then((res) => res.json())
      .then(({ subscribers, paidMembers }) => {
        setSubscribers(subscribers);
        setPaidMembers(paidMembers);
      });
  }, []);

  const chartData = {
    labels: ["Newsletter Subscribers", "Paid Members"],
    datasets: [
      {
        label: "User Count",
        data: [subscribers, paidMembers],
        backgroundColor: ["#4CAF50", "#2196F3"],
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="p-6 text-xl font-bold">
        Total Balance: ${totalBalance.toFixed(2)}
      </h1>

      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <ul>
          {transactions.map((tx, index) => (
            <li key={index} className="flex justify-between border-b py-2">
              <span>{new Date(tx.date).toLocaleDateString()}</span>
              <span className="font-medium">${tx.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">
          Subscribers vs Paid Members
        </h2>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default Balance;
