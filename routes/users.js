const express = require("express")
const { users } = require("../data/users.json")

const router = express.Router()

// Modal
const { UserModal, BookModal } = require("../modals/index-modal")

module.exports = router
/**
 * Route : /users
 * Method : GET
 * Description : Get all the users
 * Access : Public
 * Parameter : None {if in url we sent the ID then it will be the [para : ID]}
 */

// if you are caling the api in other app you 
// have not use the route that ou given in main JS file as 
// it will be the root Route 
router.get("/", (req,res) => {
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
router.get("/:id",(req,res) => {
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
router.post("/", (req, res) => {
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

/**
 * ...usr: This spreads all the properties of the usr object. It effectively creates copies of all the properties of usr in the new object being returned.

...datas: This spreads all the properties of the datas object. These properties are then added to the new object.

So, essentially, ...usr copies all properties of the original user (usr) object, and ...datas adds or updates properties based on what's provided in the datas object.
 If there are any conflicting properties between usr and datas, the properties from datas will overwrite those from usr.
 */
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req,res) => {
    const { id } = req.params
    const user = users.find((usr) => usr.id === id)

    if(!user){
        return res.status(404).json({
            success:false,
            message:"The user does not exist"
        })
    }
    const index = users.indexOf(user)
    users.splice(index, 1)
    return res.status(200).json({
        success:true,
        message:"Deleted user",
        data:users
    })
})


/**
 * Route : /users/subscription/:id
 * Method : GET
 * Description :user subscription by id
 * Access : Public
 * Parameter : ID {if in url we sent the ID then it will be the [para : ID]}
 */
router.get("/subsciption-details/:id", (req, res) => {
    const { id } = req.params,
    user = users.find((usr) => usr.id === id)

    if(!user){
        return res.status(404).json({
            success:false,
            message:"User with the ID did not exist"
        })
    }
    const getDateInDays = (data) => {
        let date 
        if(!data){
            date = new Date()
        } else {
            date = new Date(data)
        }

        let days = Math.floor(date / (1000 * 60 * 60 * 24))
        return days
    }
    const subcriptionType = (day) => {
        if(user.subscriptionType === "Basic"){
            day = day + 90
        } else if (user.subscriptionType === "Standard"){
            day = day + 180
        } else if(user.subscriptionType === "Premium"){
            day = day + 365
        }
        return day
    }

    // Jan 1 1970 UTC     ->   Day you take the book { DUMMY VALUE}
    // calculating the Renew Days : books Need to be renewed
    let return_Date = getDateInDays(user.returnDate)   // end of return day
    let currentDate = getDateInDays()   // Currently day you are at


    // User Subciption to access the book
    let subscription_Dates = getDateInDays(user.subscriptionDate)   // The Day you Subscribe yourself
    // subscriptionDates WILL carry the DAYS in number i.e Start to end amount of DAYS "173276"
    // So when this is transfer in the { subcriptionType(subscriptionDates) } it send DAYS value "173276" 
    let subcriptionExpire = subcriptionType(subscription_Dates) // The Day Your Subscription will end

    // NOTE :- That the day Work like " [ month / days / years ] " 

    const data = {
        ...user,
        isSubcriptionExpired : subcriptionExpire <= currentDate,
        daysLeftForExpiration : subcriptionExpire <= currentDate ? `Days Passed - ${currentDate - subcriptionExpire}` : subcriptionExpire - currentDate,
        bookReturnDayLeft : return_Date < currentDate ? `Days Passed - ${currentDate - return_Date}` : return_Date  - currentDate,
        fine : 
            return_Date < currentDate 
                ? subcriptionExpire <= currentDate 
                    ? 100 
                : 50 
            : 0,
            /**
             * IF( returnDate < currentDate ){
             *      IF ( subcriptionExpire <= currentDate ){
             *          100
             *      }
             *      50
             * } else {
             *      0
             * } 
             * */ 
    }

    return res.status(200).json({
        success:true,
        message:"This is Subcription section",
        data:data
    })
}) 