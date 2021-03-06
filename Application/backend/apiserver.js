// Used this tutorial: https://dev.to/lenmorld/quick-rest-api-with-node-and-express-in-5-minutes-336j


// importing the required modules in order for the API server to run and work.
const express = require('express');
const body_parser = require('body-parser');

// importing the selfmade app module.
const app = require('./app');

// express instance invoked and port number made as an instance.
const server = express();
const port = 4000;

// parse incoming JSON (application/json content-type)
// if disabled, it will return the following TypeError:
// "TypeError: Cannot read property 'username' of undefined"
server.use(body_parser.json());

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// server.get("/", (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

server.get("/json", (req, res) => {
    res.json({ message: "Hello world" });
});

server.post("/login", (req, res) => {
    let json_input = req.body;
    console.log(json_input);
    let username = json_input["username"];
    let password = json_input["password"];

    app.checkIfUserExists(username,password, function(err,data){
        if (!data) {
            // error handling code goes here
            //res.json({message: false});
            // res.status(404).send(false);
            // console.log("ERROR : ",err);
            // console.log("failed...");
            //return false;
            console.log("user does not exist...");
            res.json({message: false});
            //res.send("false");
        } else {
            // code to execute on data retrieval
            //res.json({message: true});
            //res.status(200).send(true);
            //console.log("result from db is : ",data);
            console.log("user exists!");
            res.json({message: true});
            //res.send("true");
        }
    });
});

// API for user registration
server.post("/register", (req, res) => {
    let json_input = req.body;
    let username = json_input["username"];
    let email = json_input["email"];
    let password = json_input["password"];

    app.insertUser(username,email,password, function(err,data){
        if (err) {
            // error handling code goes here
            res.status(404).send(false);
            console.log("ERROR : ",err);
        } else {
            // code to execute on data retrieval
            res.status(200).send(true);
            console.log("result from db is : ",data);
        }
    });
});

// API for creating posts
server.post("/post", (req, res) => {
    let json_input = req.body;
    let posttitle = json_input["posttitle"];
    let postdesc = json_input["postdesc"];
    let postimg = json_input["postimg"];
    let userid = json_input["userid"];

    app.insertPost(posttitle, postdesc, postimg, userid, function(err,data){
        if (err) {
            // error handling code goes here
            res.status(404).send(false);
            console.log("ERROR : ",err);
        } else {
            // code to execute on data retrieval
            res.status(200).send(true);
        }
    });
});

// API for getting all posts
server.post("/getposts", (req, res) => {
    app.fetchPosts(function(err,data){
        if (err) {
            // error handling code goes here
            res.status(404).send(false);
            console.log("ERROR : ",err);
        } else {
            // code to execute on data retrieval
            res.status(200).send(data);
        }
    });
});

// API for getting all posts
server.post("/editpost", (req, res) => {
    let json_input = req.body;
    let postid = json_input["postid"];
    let posttitle = json_input["posttitle"];
    let postdesc = json_input["postdesc"];
    let postimg = json_input["postimg"];

    app.editPost(postid, posttitle, postdesc, postimg, function(err,data){
        if (err) {
            // error handling code goes here
            res.status(404).send(false);
            console.log("ERROR : ",err);
        } else {
            // code to execute on data retrieval
            res.status(200).send(true);
        }
    });
});

// API for deleting a specific post
server.post("/deletepost", (req, res) => {
    let json_input = req.body;
    let postid = json_input["postid"];

    app.deletePost(postid, function(err,data){
        if (err) {
            // error handling code goes here
            res.status(404).send(false);
            console.log("ERROR : ",err);
        } else {
            // code to execute on data retrieval
            res.status(200).send(true);
        }
    });
});


// API for comment
server.post("/comment", (req, res) => {
    let json_input = req.body;
    let comment = json_input["comment"];
    let userid = json_input["userid"];
    let postid = json_input["postid"];


    app.createComment(comment,userid,postid,function(err,data){
        if (err) {
            // error handling code goes here
            res.status(404).send(false);
            console.log("ERROR : ",err);
        } else {
            // code to execute on data retrieval
            res.status(200).send(true);
        }
    });
});


// API for uncommenting
server.post("/uncomment", (req, res) => {
    let json_input = req.body;
    let commentid = json_input["commentid"];

    app.deleteComment(commentid,function(err,data){
        if (err) {
            // error handling code goes here
            res.status(404).send(false);
            console.log("ERROR : ",err);
        } else {
            // code to execute on data retrieval
            res.status(200).send(true);
        }
    });
});

// API for liking a post
server.post("/like", (req, res) => {
    let json_input = req.body;
    let userid = json_input["userid"];
    let postid = json_input["postid"];

    app.likePost(userid,postid,function(err,data){
        if (err) {
            // error handling code goes here
            res.status(404).send(false);
            console.log("ERROR : ",err);
        } else {
            // code to execute on data retrieval
            res.status(200).send(true);
        }
    });
});

// API for unliking a post
server.post("/unlike", (req, res) => {
    let json_input = req.body;
    let likeid = json_input["likeid"];

    app.unlikePost(likeid,function(err,data){
        if (err) {
            // error handling code goes here
            res.status(404).send(false);
            console.log("ERROR : ",err);
        } else {
            // code to execute on data retrieval
            res.status(200).send(true);
        }
    });
});

server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});
