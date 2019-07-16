import React from 'react';
import './App.css';
import ExpenceList from './components/ExpenceList';
import ExpenceForm from './components/ExpenceForm';
import Alert from './components/Alert';


function App() {
  return (
    <>
    <Alert/>
    <ExpenceForm/>
    <ExpenceList/>
    </>
  );
}

export default App;
