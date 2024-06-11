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
 * Route : /users/:id
 * Method : GET
 * Description : Get single user by ID
 * Access : Public
 * Parameter : ID
 */
app.get("/users/:id",(req,res) => {
    const {id} = req.params;
    const user = users.find((user) => user.id === id)
    if(!user){
        return res.status(404).json({
            success : false,
            message : "User not exists"
        })
    } else {
        return res.status(200).json({
            success : true,
            message : "User Found",
            data : user
        })
    }
})

/**
 * Route : /users
 * Method : POST
 * Description : Creating a new user
 * Access : Public
 * Parameter : None {if in url we sent the ID then it will be the [para : ID]}
 */
app.post("/users", (req, res) => {
    const {id, name, surname, email, subscriptionType, subscriptionDate} = req.body,
    user = users.find((usr) => usr.id === id)

    if(!user){
        users.push({
            id,
            name,
            surname,
            email,
            subscriptionDate,
            subscriptionType
        })
        return res.status(200).json({
            success:true,
            message:"THe user is Created",
            data:users
        })
    }
    return res.status(404).json({
        success:false,
        message:"User with this ID exist"
    })
})

/**
 * Route : /users/:id
 * Method : PUT
 * Description : Updating the user Details
 * Access : Public
 * Parameter : ID {if in url we sent the ID then it will be the [para : ID]}
 */
app.put("/users/:id", (req, res) => {
    const {id} = req.params;
    const user = users.find((user) => user.id === id),
    datas  = req.body

    if(!user){
        return res.status(404).json({
            success : false,
            message : "User does not exists"
        })
    }
    const updtaeUserData = users.map((usr) => {
        if(usr.id === id){
            return {
                ...usr,
                ...datas
            }
        }
        return usr
    })
    return res.status(200).json({
        success:true,
        message:"user Updated",
        data: updtaeUserData
    })
})

/**
 * Route : /users/:id
 * Method : DELETE
 * Description : Deleting user by their ID
 * Access : Public
 * Parameter : ID {if in url we sent the ID then it will be the [para : ID]}
 */
app.delete("/users/:id", (req,res) => {
    const {id} = req.params;
    const user = users.find((user) => user.id === id)

    if(!user){
        return res.status(404).json({
            success : false,
            message : "User does not exists"
        })
    }
    // need to build logic for delete here....
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