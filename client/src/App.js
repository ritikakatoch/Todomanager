import {BrowserRouter, Route,Routes } from 'react-router-dom';
import './App.css';
import AddEdit from './pages/AddEdit';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
    <div className='todo-app'>
      <Routes> 
        <Route exact path="/" element={<Home/>}/>
        <Route path="/addTasks" element={<AddEdit/>}/>
        <Route path="/update/:taskid" element={<AddEdit/>}/>
        {/* <Redirect to="/" /> */}
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;