
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors=require("cors");
// const expressJwt = require('')

app.use(cors()); //middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todomanager'
});
   
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected with App...');
});
   
app.get('/api/get',(req, res) => {
  const sqlQuery = "SELECT * FROM tasks";
  conn.query(sqlQuery, (err, results) => {
    // if(err) throw err;
    res.send(results);
  });
});


app.get("/",(req,res)=>{
    const sqlInsert= "INSERT INTO  tasks (taskid,task) VALUES (5,'Buy Flowers')";
    conn.query(sqlInsert,(error, result) =>{
    console.log("error",error);
    console.log("result",result);
    res.send("Hello Express");
    
   });
});

app.post("/api/post",(req,res) => {
  const{task}=req.body;
  const sqlInsert= "INSERT INTO  tasks (task) VALUES ( ? )";
  conn.query(sqlInsert,[task],(error,result) => {
    if(error){
      console.log(error);
    }
    res.send(result);
  });
 
});

app.delete("/api/remove/:taskid",(req,res) => {
  const{taskid}=req.params;
  const sqlRemove= "DELETE FROM tasks WHERE taskid=?";
  conn.query(sqlRemove,taskid,(error,result) => {
    if(error){
      console.log(error);
    }
    res.send(result);
  })
 
});

   
app.get('/api/get/:taskid',(req, res) => {
  const{taskid}=req.params;
  const sqlGet = "SELECT * FROM tasks WHERE taskid= ?";
  conn.query(sqlGet, taskid,(err, results) => {
    if(err) {
    console.log(err)
    }
    res.send(results);
  });
});

app.put('/api/update/:taskid',(req, res) => {
  const{ taskid }=req.params;
  const {task}=req.body;
  const sqlUpdate = "UPDATE tasks SET task=? WHERE taskid=?";
  conn.query(sqlUpdate,[task,taskid], (err, results) => {
    if(err){
    console.log(err)
    }
    res.send(results);
  });
});


app.listen(3300,() =>{
  console.log('Server started on port 3300...');
});