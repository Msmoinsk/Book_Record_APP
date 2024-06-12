const express = require("express")
const { books } = require("../data/books.json"),
{users} = require("../data/users.json")

const router = express.Router()

module.exports = router


/**
 * Route : /books
 * Method : GET
 * Description : Get all the books
 * Access : Public
 * Parameter : None {if in url we sent the ID then it will be the [para : ID]}
 */
router.get("/", (req,res) => {
    res.status(200).json({
        success : true,
        messge:"Got all the Books",
        data : books
    })
})

/**
 * Route : /books/issued
 * Method : GET
 * Description : Get issued book
 * Access : Public
 * Parameter : none {if in url we sent the ID then it will be the [para : ID]}
 */
router.get("/issued", (req, res) => {
    const userBookIssued = users.filter((user) => {
        if(user.issuedBook) return user
    })
    const issuedBooks = []
    userBookIssued.forEach((issedUser) => {
        const book = books.find((issueBook) => issueBook.id === issedUser.issuedBook)
        book.issueBy = issedUser.name
        book.issueDate = issedUser.issuedDate
        book.returnDate = issedUser.returnDate

        issuedBooks.push(book)
    })
    if(issuedBooks.length === 0){
        return res.status(404).json({
            success:false,
            message:"no book found"
        })
    }
    return res.status(200).json({
        success:true,
        message:"Book found",
        data:issuedBooks
    })
})


/**
 * Route : /books/:id
 * Method : GET
 * Description : Get the single book
 * Access : Public
 * Parameter : id {if in url we sent the ID then it will be the [para : ID]}
 */
router.get("/:id", (req, res) => {
    const { id } = req.params,
    book = books.find((boak) => boak.id === id)

    if(!book){
        return res.status(404).json({
            success:false,
            messge:"Book not found"
        })
    }
    return res.status(200).json({
        success:true,
        message:"Book found",
        data:book
    })
})


/**
 * Route : /books
 * Method : POST
 * Description : Insert a new Book to the library
 * Access : Public
 * Parameter : None {if in url we sent the ID then it will be the [para : ID]}
 */