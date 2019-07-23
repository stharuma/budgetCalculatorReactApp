import React, { useState, useEffect } from "react";
import "./App.css";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import Alert from "./components/Alert";
import uuid from "uuid/v4";

//localStorage.getItem('item name')
//localStorage.setItem('item name')
//Dynamically  id updated
// const initialExpenses = [
//   { id: uuid(), charge: "rent", amount: 1400 },
//   { id: uuid(), charge: "car payment", amount: 400 },
//   { id: uuid(), charge: "credit card bill", amount: 1200 }
// ];
//console.log(initialExpenses);

const initialExpenses=localStorage.getItem('expenses')
? JSON.parse(localStorage.getItem('expenses')):[];
//import useState
//function return [] with two values
//the actual value of the state-----my array
//function for updates /control-----my function
//default value
//******************************** */
//class based component
//state = {expenses:initialExpenses}
//this.setState({})
function App() {
  // console.log(useState());
  // const result=useState(initialExpenses);
  // const expenses = result[0];
  // const setExpenses=result[1];
  //***************State Values***************
  //All expenses and Add expenses
  const [expenses, setExpenses] = useState(initialExpenses);
  //console.log(expenses,setExpenses);
  //single expense
  const [charge, setCharge] = useState("");
  //single amount
  const [amount, setAmount] = useState("");
  //alert
  const [alert, setAlert] = useState({ show: false });
  //Edit
  const [edit, setEdit] = useState(false);
  //edit item
  const [id, setId] = useState(0);
//****************useEffect********
  //useEffect let's perform side effects
  //run after every render
  //first parameter - callback function (runs after render)
  //second parameter - array -for letting react know when to run useEffect
  //react re-renders when state has changed or props
  useEffect(()=>{
    console.log('we called useEffect');
    localStorage.setItem('expenses', JSON.stringify(expenses));
  },[expenses]) 
  //****************functionality********
  //handle charge
  const handleCharge = e => {
    // console.log(`charge: ${e.target.value}`);
    setCharge(e.target.value);
  };
  //handle amount
  const handleAmount = e => {
    // console.log(`amount: ${e.target.value}`);
    setAmount(e.target.value);
  };
  //handle alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };
  //handle submit
  const handleSubmit = e => {
    e.preventDefault();
    //  console.log(charge, amount);
    if (charge !== "" && amount > 0) {
      if (edit) {//using map for same order list we also use filter
        let tempExpenses = expenses.map(item => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "item edited" });
      } else {
        const singleExpense = { id: uuid(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "item added" });
      }
      setCharge("");
      setAmount("");
    } else {
      //handle alert called
      handleAlert({
        type: "danger",
        text: `charge can't be empty value and amount value 
        has to be bigger than zero`
      });
    }
  };
  // clear all items
  const clearItems = () => {
    //console.log('clear all items')
    setExpenses([]);
    handleAlert({ type: "danger", text: "All items deleted" });
  };

  //handle delete
  const handleDelete = id => {
    // console.log(`item deleted : ${id}`);
    let tempExpenses = expenses.filter(item => item.id !== id);
    //console.log(tempExpenses);
    setExpenses(tempExpenses);
    handleAlert({ type: "danger", text: "item deleted" });
  };

  //handle edit
  const handleEdit = id => {
    //console.log(`item edited : ${id}`);
    let expense = expenses.find(item => item.id === id);
    //console.log(expense);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };
  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>budget calculator</h1>
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
        total spending :{" "}
        <span className="total">
          $
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
