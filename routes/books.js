const express = require("express")
const { books } = require("../data/books.json"),
{users} = require("../data/users.json")

const router = express.Router()

// Modal
const { UserModal, BookModal } = require("../modals/index-modal")

// Controllers
const { 
    getAllBooks, 
    getSingleBookById, 
    getAllIssuedBooks,
    addNewBook,
} = require("../controller/book-controller")

module.exports = router

/**
 * Route : /books
 * Method : GET
 * Description : Get all the books
 * Access : Public
 * Parameter : None {if in url we sent the ID then it will be the [para : ID]}
 */
router.get("/", getAllBooks)
// router.get("/", (req,res) => {
//     res.status(200).json({
//         success : true,
//         messge:"Got all the Books",
//         data : books
//     })
// })

/**
 * Route : /books/issued
 * Method : GET
 * Description : Get issued book
 * Access : Public
 * Parameter : none {if in url we sent the ID then it will be the [para : ID]}
 */
router.get("/issued", getAllIssuedBooks)
// router.get("/issued", (req, res) => {
//     const userBookIssued = users.filter((user) => {
//         if(user.issuedBook) return user
//     })
//     const issuedBooks = []
//     userBookIssued.forEach((issedUser) => {
//         const book = books.find((issueBook) => issueBook.id === issedUser.issuedBook)
//         book.issueBy = issedUser.name
//         book.issueDate = issedUser.issuedDate
//         book.returnDate = issedUser.returnDate

//         issuedBooks.push(book)
//     })
//     if(issuedBooks.length === 0){
//         return res.status(404).json({
//             success:false,
//             message:"no book found"
//         })
//     }
//     return res.status(200).json({
//         success:true,
//         message:"Book found",
//         data:issuedBooks
//     })
// })

/**
 * Route : /books/issued/withfine
 * Method : GET
 * Description : Get issued book
 * Access : Public
 * Parameter : none {if in url we sent the ID then it will be the [para : ID]}
 */
router.get("/issued/withfine", (req, res) => {
    const userIssuedFilter = users.filter((usr) => {
        if(usr.issuedBook) return usr
    })
    const issuedWithFine = []
    userIssuedFilter.forEach((user) => {

        const getDaysFormDate = (data) => {
            let date 
            if(!data){
                date = new Date()
            } else {
                date = new Date(data)
            }

            let days = Math.floor(date / (1000 * 60 * 60 * 24))
            return days
        }
        let return_Date = getDaysFormDate(user.returnDate)
        let current_Date = getDaysFormDate()

        let bookUserIssued = books.find((book) => book.id === user.issuedBook)
        bookUserIssued.issueBy = user.name
        bookUserIssued.issueDate = user.issuedDate
        bookUserIssued.returnDate = user.returnDate

        bookUserIssued.fineForTheBook = return_Date <= current_Date ? `Rs. ${(current_Date - return_Date) * 50}` : 0

        issuedWithFine.push(bookUserIssued)
    })
    if(!issuedWithFine){
        res.status(404).json({
            success:false,
            message:"No book with fine found"
        })
    }
    res.status(200).json({
        success:true,
        message:"The fine System",
        data : issuedWithFine
    })
})

/**
 * Route : /books/:id
 * Method : GET
 * Description : Get the single book
 * Access : Public
 * Parameter : id {if in url we sent the ID then it will be the [para : ID]}
 */
router.get("/:id", getSingleBookById)
// router.get("/:id", (req, res) => {
//     const { id } = req.params,
//     book = books.find((boak) => boak.id === id)

//     if(!book){
//         return res.status(404).json({
//             success:false,
//             messge:"Book not found"
//         })
//     }
//     return res.status(200).json({
//         success:true,
//         message:"Book found",
//         data:book
//     })
// })


/**
 * Route : /books
 * Method : POST
 * Description : Insert a new Book to the library
 * Access : Public
 * Parameter : None {if in url we sent the ID then it will be the [para : ID]}
 * data : books(parameter)
 */
router.post("/", addNewBook)
// router.post("/", (req, res) => {
//     const  data  = req.body,
//     book = books.find((select_book)  => select_book.id === data.id)

//     if(!data || Object.keys(data).length == 0){
//         return res.status(404).json({
//             success:false,
//             message:"No data to add a book"
//         })
//     }
//     if(book){
//         return res.status(402).json({
//             success:false,
//             message:"This Book ID already exist"
//         })
//     }
    
//     const allBoks = books
//     allBoks.push(data)
//     return res.status(201).json({
//         success:true,
//         message:"Book Been Added.",
//         data:books   
// // array [] that is assign to books ahve also asign to the allnoks so 1 array has been asign to 2 varible.
// // Changes done on any of it will affect the array.
//     })
// })

/**
 * Route : /books/:ID
 * Method : PUT
 * Description : Insert a new Book to the library
 * Access : Public
 * Parameter : Id {if in url we sent the ID then it will be the [para : ID]}
 * data : books(parameter)
 */
router.put("/:id", (req, res) => {
    const { id } = req.params,
    book = books.find((single_book) => single_book.id === id),
    data = req.body

    if(!book){
        return res.status(404).json({
            success:false,
            message:"No Such book is their"
        })
    }
    
    const updateBookData = books.map((updateBook) => {
        if(updateBook.id === id){
            return {
                ...updateBook,
                ...data
            }
        }
        return updateBook
    })
    return res.status(200).json({
        success:true,
        message:"Book updated",
        data:updateBookData
    })
})