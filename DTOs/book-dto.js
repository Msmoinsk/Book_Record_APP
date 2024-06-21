// // Data transfer object - book
// class IssuedBook {
//     _id;
//     name;
//     genre;
//     price;
//     publisher;
//     issuedBy;
//     issuedDate;
//     returnDate;

//     // Whenever  create obj , the constructor gets invoked = Parametersized Constructors
//     constructor(user, returnDt, currentDt){
//         if (!returnDt && !currentDt){
//             this._id = user.issuedBook._id
//             this.name = user.issuedBook.name
//             this.genre = user.issuedBook.genre
//             this.price = user.issuedBook.price
//             this.publisher = user.issuedBook.publisher
//             this.issuedBy = user.name
//             this.issuedDate = user.issuedDate
//             this.returnDate = user.returnDate
//         }
//         this._id = user.issuedBook._id
//         this.name = user.issuedBook.name
//         this.genre = user.issuedBook.genre
//         this.price = user.issuedBook.price
//         this.publisher = user.issuedBook.publisher
//         this.issuedBy = user.name
//         this.issuedDate = user.issuedDate
//         this.returnDate = user.returnDate
//         this.fineForTheBook = returnDt <=  currentDt ? currentDt - returnDt * 50 : 0;
//     }
// }

// module.exports = IssuedBook; 

// Data transfer object - book
class IssuedBook {
    constructor(user, returnDt, currentDt) {
        this._id = user.issuedBook._id;
        this.name = user.issuedBook.name;
        this.genre = user.issuedBook.genre;
        this.price = user.issuedBook.price;
        this.publisher = user.issuedBook.publisher;
        this.issuedBy = user.name;
        this.issuedDate = user.issuedDate;
        this.returnDate = user.returnDate;

        if (returnDt && currentDt) {
            this.fineForTheBook = returnDt <= currentDt ? (currentDt - returnDt) * 50 : 0;
        }
    }
}

module.exports = IssuedBook;
