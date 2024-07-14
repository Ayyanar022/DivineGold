import User from '../models/userModel.js'
import {v4 as uuidv4} from 'uuid';

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
        const {name,mobileNo,address,village,city,bonousCode} = req.body;
        const user = await User.findById(req.userId);
        if(!user)return res.status(404).json({message:"User not found"})    
            
        if(!user.bonousCode){
            user.bonousCode= uuidv4();  // to generate unique bonuse code ifuser first update 
            user.bonousePoints = 14;
            // to check referer user is valid or not and add that user bonuse points alos
            if(bonousCode){
                const reffererUser = await User.findOne({bonousCode:bonousCode});
                console.log("reffererUser",reffererUser)
                if(!reffererUser) return res.json({message:"its not valid SuperCode.."})

                reffererUser.bonousePoints = (reffererUser.bonousePoints ||0)+10    ;
                await reffererUser.save()
                user.bonousePoints=23     
            }
        }
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

