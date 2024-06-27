const express = require("express");
const app = express();
app.use(express.json());

// Mongo Db Connection URL Config
const dotenv = require("dotenv")
dotenv.config()
// Data Base connection file
const DbConnection = require("./dataBaseConnection.js")
DbConnection()

// Route For the Backend
const userRouter = require("./routes/users"),
booksRoutes = require("./routes/books.js")

const PORT = 8052

/**
 * Route : /
 * Method : GET 
*/ 

// http://localhost:8051/
app.get("/", (req,res) => {
    res.status(200).json({
        message:"Server is running",
        data:"<h1>Hiiiii</h1>",
    })
})

// http://localhost:8051/users/
app.use("/users", userRouter)

// http://localhost:8051/books/
app.use("/books", booksRoutes)


app.get("*",(req,res) => {
    res.status(404).json({
        message:"This route does not exist"
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`)
})