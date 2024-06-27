// Modal
const { UserModal, BookModal } = require("../modals/index-modal")

exports.getAllUsers = async (req,res) => {
    const users = await UserModal.find()

    if(users.length === 0){
        return res.status(404).json({
            success : false,
            messge:"Their are No user information.",
        })
    }
    res.status(200).json({
        success : true,
        message:"the List of Users Are provided.",
        data : users
    })
}

exports.getSingleUserById = async (req,res) => {
    const { id } = req.params;
    const user = await UserModal.findById(id)

    if(!user){
        return res.status(404).json({
            success : false,
            message : "User does not exists"
        })
    } else {
        return res.status(200).json({
            success : true,
            message : "User Found",
            data : user
        })
    }
}

exports.createNewUser = async (req, res) => {
    const data = req.body

    if(!data.name || !data.surname || !data.email || !data.subscriptionType || !data.subscriptionDate){
        return res.status(404).json({
            success: false,
            message: `Please Fill the following feilds { name, surname, email, subscriptionType, subscriptionDate }`
        })
    }
    await UserModal.create(data)
    const allUsers = await UserModal.find()
    return res.status(200).json({
        success: true,
        message: "The user is Been Added",
        data: allUsers
    }) 
}

exports.deleteUserById = async (req,res) => {
    const { id } = req.params,
    deleteUser = await UserModal.deleteOne({ _id: id })

    if(!deleteUser){
        return res.status(404).json({
            success:false,
            message:"The user does not exist"
        })
    }
    return res.status(200).json({
        success:true,
        message:"Deleted user",
        data: deleteUser
    })
}

exports.updateTheUserData = async (req, res) => {
    const { id } = req.params,
    data  = req.body

    const user = await UserModal.findById(id)
    if(!user){
        return res.status(404).json({
            success : false,
            message : "User does not exists"
        })
    }

    const updateUserData = await UserModal.findOneAndUpdate(
        { _id : id },
        { $set: {
            ...data
        } },
        { new: true, }
    )

    return res.status(200).json({
        success:true,
        message:"User Updated",
        data: updateUserData
    })
}

exports.getSubscriptionsDetails = async (req, res) => {
    const { id } = req.params,
    // Cheching User Exist Or not
    user = await UserModal.findById(id)
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User with the ID did not exist"
        })
    }

// The Below code Convert the Days and Used to Calculate expiration
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
        user,
        isSubcriptionExpired : subcriptionExpire <= currentDate,
        daysLeftForExpiration : subcriptionExpire <= currentDate ? `Days Passed - ${currentDate - subcriptionExpire}` : subcriptionExpire - currentDate,
        bookReturnDayLeft : return_Date < currentDate ? `Days Passed - ${currentDate - return_Date}` : return_Date  - currentDate,
        fine : 
            subcriptionExpire < currentDate 
                ? return_Date <= currentDate 
                    ? 100 + ((currentDate - return_Date) * 50)
                : 100 
            : return_Date <= currentDate 
                ? subcriptionExpire < currentDate 
                    ? 100 + ((currentDate - return_Date) * 50) 
                : ((currentDate - return_Date) * 50) 
            : 0 ,
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
}