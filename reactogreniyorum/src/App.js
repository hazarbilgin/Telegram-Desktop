import React, { useState, useEffect } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Alert from "./components/Alert";
const initialExpenses = [
  { id: 1, charge: "rent", amount: 1600 },
  { id: 2, charge: "car payment", amount: 400 },
  { id: 3, charge: "credit card bill", amount: 1200 },
];
//  const initialExpenses = localStorage.getItem("expenses")
//    ? JSON.parse(localStorage.getItem("expenses"))
//   : [];
function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState("");
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState({ show: false });
  // useEffect(() => {
  //   console.log("we called useEffect");
  //   localStorage.setItem("expenses", JSON.stringify(expenses));
  // },[expenses]);
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true }, type, text);
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  const handleCharge = (e) => {
    console.log("charge: ", e.target.value);
    setCharge(e.target.value);
  };

  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);

    console.log(expense);
  };
  const clearItems = (id) => {
    setExpenses([]);
    console.log("item deleted:", id);
  };

  const handleDelete = (id) => {
    let tempExpenses = expenses.filter((item) => item.id !== id);
    console.log(tempExpenses);
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: "item deleted" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "item edited" });
      } else {
        const singleExpense = { id, charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "item added" });
      }
      setCharge("");
      setAmount("");
    } else {
      handleAlert({
        type: "danger",
        text: "you cant do that",
      });
    }
  };

  const handleAmount = (e) => {
    console.log("amount ", e.target.value);

    setAmount(e.target.value);
  };
  return (
    <>
      {alert.show && (
        <Alert type={alert.type} text={alert.text} handleAlert={handleAlert} />
      )}
      <Alert />
      <h1>Budget Calculater</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>

      <h1>
        Total spending: <span className="total"></span>$
        {expenses.reduce((acc, curr) => {
          return (acc += parseInt(curr.amount));
        }, 0)}
      </h1>
    </>
  );
}

export default App;
