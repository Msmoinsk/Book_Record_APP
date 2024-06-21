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
    const { name, surname, email, subscriptionType, subscriptionDate } = req.body

    if(!name || !surname || !email || !subscriptionType || !subscriptionDate){
        return res.status(404).json({
            success: false,
            message: `Please Fill the following feilds { name, surname, email, subscriptionType, subscriptionDate }`
        })
    }
    await UserModal.create(
        { name, surname, email, subscriptionType, subscriptionDate }
    )
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