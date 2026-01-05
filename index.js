const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
const port = 8080;


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "Public")));

let posts = [
    {
        id: uuidv4(),
        username: "apnacollege",
        content: "I love coding!"
    },
    {
        id: uuidv4(),
        username: "Tanishq Farkya",
        content: "Never Ever Stop Working tough task"
    },
    {
        id: uuidv4(),
        username: "Vasu Farkya",
        content: "Money is everthing"
    },

];

app.get("/post", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/post/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/post", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    //res.send("post request working");
    res.redirect("/post");
});

app.get("/post/:id", (req, res) => {
    let { id } = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    //console.log(pos);
    res.render("show.ejs", { post });
});

app.patch("/post/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    
    post.content = newContent;
    console.log(post);
    res.redirect("/post");
});

app.get("/post/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id == p.id);
    res.render("edit.ejs",{post});
    
});
app.delete("/post/:id/delete",(req,res)=>{
  let {id} = req.params;
  posts = posts.filter((p)=> id!== p.id);
  res.redirect("/post");
});

app.listen(port, () => {
    console.log("app is start listening");
})