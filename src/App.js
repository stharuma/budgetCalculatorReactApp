import React, {useState} from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Alert from './components/Alert';
import uuid from 'uuid/v4'

//Dynamically  id updated  
const initialExpenses =[
  {id:uuid(), charge:"rent", amount:1400},
  {id:uuid(), charge:"car payment", amount:400},
  {id:uuid(), charge:"credit card bill", amount:1200}
]
//console.log(initialExpenses);
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
  const [expenses,setExpenses] =useState(initialExpenses);
  console.log(expenses,setExpenses);


  
  return (
    <>
    <Alert/>
    <h1>budget calculator</h1>
    <main className="App">
    <ExpenseForm/>
    <ExpenseList expenses={expenses}/>
    </main>
    <h1>
    total spending : <span className="total">
    ${expenses.reduce((acc, curr)=>{
      return acc+=curr.amount;
    },0)}
    </span>
    </h1>
   
    </>
  );
}

export default App;
