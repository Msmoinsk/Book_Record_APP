const express = require("express");
const app = express();
app.use(express.json());

const PORT = 8051

app.get("/", (req,res) => {
    res.status(200).json({
        message:"Server is running",
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`)
})