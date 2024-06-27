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

exports.getAllIssuedBooksWithFine = async (req, res) => {
    const userIssuedBooks = await UserModal.find({
        issuedBook: {$exists: true}
    }).populate("issuedBook")

    const issuedBook_s = userIssuedBooks.map( (usr) => {
        
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
        let return_Date = getDaysFormDate(usr.returnDate)
        let current_Date = getDaysFormDate()
        
        return new IssuedBook(usr, return_Date, current_Date)
    } )

    if(issuedBook_s.length === 0){
        return res.status(404).json({
            success: false,
            message: "No User have Issued Book"
        })
    }
    return res.status(200).json({
        success: true,
        message: "User With Issued Book and With Book Fine Here",
        data: issuedBook_s
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

exports.updateBookById = async(req, res) => {
    const { id } = req.params,
    data = req.body,
    // This Below Code is only used for checking if data is their or not
    book = await BookModal.findById(id)
    if(!book){
        return res.status(404).json({
            success:false,
            message:"No Such book is their"
        })
    }
    // Above Code end here

    // Main ligic is given below
    const updateBookData = await BookModal.findOneAndUpdate({
        _id : id,
    }, data, {
        new: true,
    })

    return res.status(200).json({
        success:true,
        message:"Book updated",
        data:updateBookData
    })
}
// module.exports = {
//     getAllBooks,
//     getSingleBookById
// }