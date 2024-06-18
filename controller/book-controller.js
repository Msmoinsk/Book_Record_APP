// Modal
const { UserModal, BookModal } = require("../modals/index-modal")
const IssuedBook = require("../DTOs/book-dto")

exports.getAllBooks = async(req,res) => {
    const books = await BookModal.find()

    if(books.length === 0){
        return res.status(404).json({
            success : false,
            messge:"No Books are Their.",
        })
    }
    res.status(200).json({
        success : true,
        messge:"We Got all the Books",
        data : books
    })
}

exports.getSingleBookById = async(req, res) => {
    const { id } = req.params,
    book = await BookModal.findById(id)

    if(!book){
        return res.status(404).json({
            success:false,
            messge:"Your Book not found"
        })
    }
    return res.status(200).json({
        success:true,
        message:"Book found",
        data:book
    })
}

exports.getAllIssuedBooks = async(req, res) => {
    const userBookIssued = await UserModal.find({
        issuedBook: {$exists: true}
    }).populate("issuedBook")
    
    // Data Transfer Objects
    const issueBooks = userBookIssued.map( (user) => new IssuedBook(user) )

    if(issueBooks.length === 0){
        return res.status(404).json({
            success:false,
            message:"no book found"
        })
    }
    return res.status(200).json({
        success:true,
        message:"Book found",
        data:issueBooks
    })
}

exports.addNewBook = async(req, res) => {
    const data = req.body
    if(!data || Object.keys(data).length == 0){
        return res.status(404).json({
            success:false,
            message:"No data to add a book"
        })
    }

    await BookModal.create(data)
    const allBooks = await BookModal.find()
    
    return res.status(201).json({
        success:true,
        message:"Book Been Added.",
        data: allBooks   
    })
}

// module.exports = {
//     getAllBooks,
//     getSingleBookById
// }