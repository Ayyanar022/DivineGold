import User from '../models/userModel.js'

const createCurrentUser = async(req,res)=>{
    //check if user is exist
    // if dosent create user 
    // return the user object 

    try{
        const {auth0Id} = req.body;
        const existingUser = await User.findOne({auth0Id})

        if (existingUser)return res.status(200).send();

        const newUser = new User(req.body);
        await newUser.save()
        res.status(201).json(newUser.toObject())

    }catch(error){
        console.log(error.message)
        res.json({message:"Error creating user", })
    }
}

export default {
    createCurrentUser, 
}

