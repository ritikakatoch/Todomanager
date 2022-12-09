import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from "react-router-dom";
import TodoForm from './TodoForm';
import Todo from './Todo';
import axios from 'axios';

function updateTask() {
  const [todos, setTodos] = useState([]);
  
  // const loadDat=async() => {
  //   const response=await axios.get("http://localhost:3300/api/get");
  //   setData(response.data);
  // }

  // useEffect(() => {
  //   useLoaderData();
  // },[]);

  
  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {

      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    console.log(...todos);
    axios.post('http://localhost:3300/api/get')
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = id => {
   // const removedArr = [...todos].filter(todo => todo.id !== id);
    
    setTodos(removedArr);
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default updateTask

