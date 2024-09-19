const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const methodOverride=require("method-override");

// to create a random id's
const {v4:uuidv4}=require('uuid');

//basic settings

// for get data from post request that is send as a post request
app.use(express.urlencoded({extended:true}));
// form can only send request get and post , to convert other type request
app.use(methodOverride("__method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

// serving static files
app.use(express.static(path.join(__dirname,"public")));

app.listen(port,()=>{
    console.log("app is listening at port:8080");
});

let posts=[
    {
        id:uuidv4(),
        username:"Suresh singh",
        content:"I Love coding"
    },
    {
        id:uuidv4(),
        username:"Rajesh kumar maurya",
        content:"I love Chemistry"
    },
    {
        id:uuidv4(),
        username:"ALok prajapati",
        content:"I got Selected in Wipro as a full Stack Developer"
    }
];

// index route(main route)
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
// add new post 
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts"); // it create a get request to /post route
});
// show particular post based on it's id
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    if(post==undefined)
        res.send("No data found");
    else
        res.render("show.ejs",{post});
});
// edit a particular post
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    res.render("edit.ejs",{post});
});
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newcontent=req.body.content;
    let post=posts.find((p)=> id===p.id);
    post.content=newcontent;
    res.redirect("/posts");
});
// deleting post 
app.delete("/posts/:id",(req,res)=>{
    console.log("Delete route working");
    let {id}=req.params;
     posts=posts.filter((p)=> id!=p.id);
     res.redirect("/posts");
});

