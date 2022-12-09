import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import "./Home.css";
import "../App.css";
import {toast} from "react-toastify";
import axios from "axios";

// import { Toast } from "bootstrap";
// import Home from "./pages/Home"


const initialState = {
  task: "",
};
 
const AddEdit = () => {
 
  const [state, setState] = useState(initialState);

  const { task } = state;
  const history=useNavigate();
  const{taskid}=useParams();

  useEffect(()=>{
    axios.get(`http://localhost:3300/api/get/${taskid}`).then((resp) => setState({...resp.data[0]}));
  },[taskid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) {
      toast.error("Add a task");   
    } else { 
      if(!taskid){
        axios.post("http://localhost:3300/api/post", {
          task
        })
        .then(() => {
          setState({ task: "" });
        })
        .catch((err) => toast.error(err.response.data));
      }else{
        axios.put(`http://localhost:3300/api/update/${taskid}`,{
          task
        })
        .then(() => {
          setState({ task: "" });
        })
        .catch((err) => toast.error(err.response.data));
        
      }
        setTimeout(() => history.push("/")
        ,500);
    }
  };

  const handleInputChange = (e) => {
         const {name,value}=e.target;
         setState({...state,[name]:value});
  };
 
  return (
    <>
    
      <h1 className="newTask">Add Subtasks</h1>
      <div className="additem">
      <form onSubmit={handleSubmit} className='todo-form'>
          <input
            placeholder='Add a task'
            type="text"
            name="task"
            id="task"
            value={task || ""}
            onChange={handleInputChange} 
          />
          <input  className='todo-buttons' type="Submit" value={taskid ? "update" :"Add task"}/>
          <Link to="/">
            <input type="button" value="Tasks" className='task-button'/>
          </Link>
    </form>
    </div>
    </>
  );
};

export default AddEdit;
