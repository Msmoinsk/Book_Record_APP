# Book Record management app

Server Components 
- Storing certain book data
- User Registrations
- Subscriptions -- Time durations to access the books

This is the book record management API Server / Backend for library system or management of records or manuals or books

## Fine System
- User : Issued on 06/01/2024 --  Subscript for 6 months -- return on 06/06/2024
- Then : delay or 3 days will be this === for 1:=50 so (50*3)

## Subscription 
- 3 months (basic)
- 6 months (standard)
- 12 months (premium)

if the subscription type is standard && if the subscription date is 06/01/2024
- then subscription valid till 06/06/2024

- => within subscription date >> if e miss the renewal >> 50/- day
- => subscription date is also been missed >> adn also missed the renewal >> 100 + 50/- day

MEANS 
- missed by renewal date >> 50/-
- missed by subscription date >> 100/-
- missed by renewal && subscription date >> 100 + 50 /-




## Routes and Endpoints

### /users
- POST    : Create a new users
- GET     : Get all the information of different users

### /users/{User_id}
- GET     : Get a user data by ID
- PUT     : Update the user by their ID (Only some data updations)
- DELETE  : Delete that user by ID (Check If he/she still have an issued book) && (Check if is there any fine to be paid)

### /users/subsciption-details/{User_id}
- GET     : Get user subscription details
            >> Data subscriptions
            >> Valid till
            >> Fine on that User

### /books 
- GET     : Get all the books 
- POST    : Create / Add Books 

### /books/{book_id}
- GET     : Get a book by ID
- PUT     : Update a book by its ID

### /books/issued
- GET     : Get all th issued books

### /books/issued/withfine
- GET     : Get all issued books with the fine


# Backend + Database
## MVC arch

   >> M : Modal - Bundle the View $ controller / It depicts the structure of a MongoDB collection
   >> V : View - Write the frontend part for the user REACT JS / Angular JS
   >> C : Controller - Brain of the App / Logical part of Routes , All API are defined under this
        >> books.controllers.js
        >> users.controller.js


## Schema vs Modal

<< schema :- id: String
             name : String
             age : Number
             Gender : Char || varChar()

<< Modal :- id: 123
            name: moin
            age: 23
            gender: "M"

## foreing keys :
<< Referential Integrity

Users Table                  | Books Table
issedBook : 2(Foreing Key)   | issuedBook : 2(Primary Key)