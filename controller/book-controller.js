// Modal
const bookModals = require("../modals/book-modals")
const { UserModal, BookModal } = require("../modals/index-modal")

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
    // const issuedBook_s = userBookIssued.map( (user) => new issuedBook(user) )

    // userBookIssued.forEach((issedUser) => {
    //     const book = BookModal.find((issueBook) => issueBook.id === issedUser.issuedBook)
    //     book.issueBy = issedUser.name
    //     book.issueDate = issedUser.issuedDate
    //     book.returnDate = issedUser.returnDate

    //     issuedBooks.push(book)
    // })
    if(issuedBook_s.length === 0){
        return res.status(404).json({
            success:false,
            message:"no book found"
        })
    }
    return res.status(200).json({
        success:true,
        message:"Book found",
        data:issuedBook_s
    })
}

// module.exports = {
//     getAllBooks,
//     getSingleBookById
// }