const express = require("express");
const app = express();
app.use(express.json());

const { users } = require("./data/users.json")
const { books } = require("./data/books.json")

const PORT = 8051

/**
 * Route : /
 * Method : GET 
*/ 
app.get("/", (req,res) => {
    res.status(200).json({
        message:"Server is running",
        data:"<h1>Hiiiii</h1>",
    })
})

/**
 * Route : /users
 * Method : GET
 * Description : Get all the users
 * Access : Public
 * Parameter : None {if in url we sent the ID then it will be the [para : ID]}
 */
app.get("/users", (req,res) => {
    res.status(200).json({
        success : true,
        data : users
    })
})

/**
 * Route : /books
 * Method : GET
 * Description : Get all the books
 * Access : Public
 * Parameter : None {if in url we sent the ID then it will be the [para : ID]}
 */
app.get("/books", (req,res) => {
    res.status(200).json({
        success : true,
        data : books
    })
})





app.get("*",(req,res) => {
    res.status(404).json({
        message:"This oute does not exist"
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`)
})