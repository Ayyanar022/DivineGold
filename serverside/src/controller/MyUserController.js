import User from '../models/userModel.js'

const createCurrentUser = async(req,res)=>{

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

const updateCurrentUser = async(req,res)=>{
    try{
       
        const {name,mobileNo,address,village,city} = req.body;
        console.log("name",name)
        const user = await User.findById(req.userId);

        if(!user)return res.status(404).json({message:"User not found"})
        
        user.name=name;
        user.mobileNo=mobileNo
        user.address=address
        user.village=village
        user.city=city

       await user.save()
        res.send(user)
        

    }catch(err){
        console.log("Error in update ",err)
        res.json({message:"Error updating user"})
    }
}

export default {
    createCurrentUser, 
    updateCurrentUser,
}

