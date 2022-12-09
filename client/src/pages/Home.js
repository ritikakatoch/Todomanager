import React, { useState, useEffect } from "react";
import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";
// import { useHistory, useParams } from "react-router-dom";
import "./Home.css";
import "./AddEdit.css";
// import { NavLink } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { FcTodoList } from "react-icons/fc";

const Home = () => {
  
  const [data, setData] = useState([]);
  

  const loadData = async () => {
    const response = await axios.get("http://localhost:3300/api/get");
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteTask=(taskid)=>{
    axios.delete(`http://localhost:3300/api/remove/${taskid}`);
    setTimeout(() => loadData(),500);
  }

  return (
    <>
      <h1 className="list">Todo App</h1>
      {/* <div classsName="todo-app"> */}
      <div className="todo-inputs">
        <label className="todo-input">What you wanna do today?</label>
         <Link  to="/addTasks">
         <button  
           className='todo-button'>
            Add task  
         </button>
         </Link>
        
      </div>
      <div 
      className="todo-apps" 
      style={{ marginTop: "10px" }}>
       
       
        <table className="styled-table">
      
      
          <tbody>
            {data.map((tasks, index) => {
              return (
                <tr key={tasks.taskid}>
                  <th scope="row">{index + 1}</th>
                  <td>{tasks.task}</td>
                  <td>
                    <Link to={`/update/${tasks.taskid}`}>
                      <button className="btn btn-edit"><TiEdit
                      className=" .edit-icon "
                    /></button>
                    </Link>
                    <button className="btn btn-delete" onClick={()=> deleteTask(tasks.taskid)}> 
                    <RiCloseCircleLine
                      
                      className=".delete-icon"
                    /></button>
              </td>
                  
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* </div> */}
    </>
  );
};

export default Home;
