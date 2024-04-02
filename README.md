# Book Record management app

Server Components 
>> Storing certain book data
>> User Registrations
>> Subscriptions -- Time durations to access the books

This is the book record management API Server / Backend for library system or management of records or manuals or books

## Fine System
User : Issued on 06/01/2024 --  Subscript for 6 months -- return on 06/06/2024
Then : delay or 3 days will be this === for 1:=50 so (50*3)

## Routes and Endpoints

### /users
POST    : Create a new users
GET     : Get all the information of different users

### /users/{User_id}
GET     : Get a user data by ID
PUT     : Update the user by their ID (Only some data updations)
DELETE  : Delete that user by ID (Check If he/she still have an issued book) && (Check if is there any fine to be paid)