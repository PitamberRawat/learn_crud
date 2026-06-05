import React, { useState } from 'react'
import axios from 'axios';
import "./App.css"
import Todo from './Todo';
import AuthPage from './AuthPage';

const App = () => {
  const [User, setUser] = useState(false);
  return (
    <>
      { User ? 
      <Todo /> 
      : <AuthPage setUser={setUser} />}
    </>
  )
}

export default App