const express = require("express");
const path = require("path");
const app = express()

const mysql = require('mysql2');


const PORT = process.env.PORT || 5500;
app.use(express.urlencoded({extended:true}))
app.use (express.json());

let aa ="dear user"
let rr ="sakatpur";

// let data = require("./data.json")
// console.log (data);

// app.use(express.urlencoded({ex}))


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT,()=>{
    console.log("i am listning");
})

app.get("/",(req, res) =>{
    res.render("home.ejs" ,{aa});
    
});

app.get("/form",(req, res) =>{
    res.redirect("http://localhost:6500");
    
});


app.get("/gotoform",(req, res) =>{
    res.render("form.ejs");
    
});

app.post("/form", (req ,res )=>{
    let {username , password} = req.body;
    console.log(username);
    console.log(req.body);
    // res.send(`welcome dear ${username}  thanks for login your password is ${password}`);
    res.render("temp.ejs" , {username , password});


})


// app.get("/home/:un",(req,res) =>{
//      let{un}=req.params;
//      res.render("user.ejs",{data, un})
// })




// app.get("/user/:un",(req, res) =>{
//     let {un}= req.params;
//     res.render("user.ejs",{un ,rr});
    
// });

// app.get("/home/:uname",(req,res)=>{
//     console.log(req.params);
//     let {uname}=req.params;
//     res.send(uname);
// })


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'school',
  password:'ssz123',
});

// let q ='insert into students(name , age , class) values( "anushka",21,"8th")';
// try{connection.query(
//   q,
//   function (err, results, ) {
//     if(err) throw err;

//     console.log(results);
    
//  });}
//  catch(err){
//     console.log(err);
//  }


 
app.get("/dbdata", (req ,res )=>{

let q = "SELECT * FROM students WHERE class = '10th'";
;
try{connection.query(
  q,
  function (err, results, ) {
    if(err) throw err;

   
     let ejdata =results
      console.log(ejdata);
 res.render("ddata.ejs" ,{ejdata})
 });}
 catch(err){
    console.log(err);
 }

});



app.post("/dbdata", (req ,res )=>{
let {name, age,className} = req.body;
let q = `insert into students(name , age , class) values("${name}" ,${age} ,"${className}" )`;
try{connection.query(
  q,
  function (err, results, ) {
    if(err) throw err;

    console.log(results);
    res.redirect("/dbdata");


 });}
 catch(err){
    console.log(err);
 }
});

app.get("/contact",(req, res) =>{
    res.render("contact.ejs")
    
});

app.post("/contact", (req ,res )=>{
let {name, email, message} = req.body;
let m = `insert into contact(name , email , message) values("${name}" ,"${email}" ,"${message}" )`;
try{connection.query(
  m,
  function (err, results, ) {
    if(err) throw err;

    console.log(results);
    res.redirect("contact");


 });}
 catch(err){
    console.log(err);
 }
});
