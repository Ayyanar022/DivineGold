import User from '../models/userModel.js'
import {v4 as uuidv4} from 'uuid';


//GET CURRENT USER
const getCurrentUser = async(req,res)=>{
    try{
        const currentUser = await User.findOne({_id:req.userId})
        if(!currentUser)return res.status(404).json({message:"User not found.."})
        
        res.json(currentUser);
    }catch(err){
        console.log("error",err);
        return res.status(500).json({message:"somthing went wrong ",success:false})
    }
}

// CREATE USER
const createCurrentUser = async(req,res)=>{
    try{
        const {auth0Id} = req.body;
        const existingUser = await User.findOne({auth0Id})
        if (existingUser)return res.status(200).send();
        const newUser = new User(req.body);
        await newUser.save()        
        res.status(201).json(newUser.toObject())
    }catch(error){
        console.log("Error",error)
        res.json({message:"Error creating user", })
    }
}

// UPDATE CURRENT USER
// const updateCurrentUser = async(req,res)=>{
//     try{       
//         const {name,mobileNo,address,village,city,bonousCode} = req.body;
//         const user = await User.findById(req.userId);

//         if(!user)return res.status(404).json({message:"User not found"})    
        
//         const mobileCheck = await User.findOne({ mobileNo, _id: { $ne: req.userId } });
//         if (mobileCheck) return res.status(400).json({ message: "Mobile No already exists",success:false });
            
//         if(!user.bonousCode){
//             user.bonousCode= uuidv4();  // to generate unique bonuse code ifuser first update 
//             user.bonousePoints = 14;
//             // to check referer user is valid or not and add that user bonuse points alos
//             if(bonousCode){
//                 const reffererUser = await User.findOne({bonousCode:bonousCode});
//                 if(!reffererUser) return res.status(400).json({message:"Incorrect Treasure Code..",success:false})

//                 reffererUser.bonousePoints = (reffererUser.bonousePoints ||0)+10    ;
//                 await reffererUser.save()
//                 user.bonousePoints=23     
//             }
//         }
//         user.name=name;
//         user.mobileNo=mobileNo
//         user.address=address
//         user.village=village
//         user.city=city
//        await user.save()
//         res.send({user,success:true,message:"Account Updated successfull..!"})     
//     }catch(err){
//         console.log("Error in update ",err)
//         res.json({message:"Error updating user"})
//     }
// }


const updateCurrentUser = async (req, res) => {
    try {
        const { name, mobileNo, address, village, city, bonousCode } = req.body;
        const user = await User.findById(req.userId);

        if (!user) return res.status(404).json({ message: "User not found" });

        const mobileCheck = await User.findOne({ mobileNo, _id: { $ne: req.userId } });
        if (mobileCheck) return res.status(400).json({ message: "Mobile No already exists", success: false });

        if (!user.bonousCode) {
            let generatedBonousCode;
            let isUnique = false;

            // Generate and check for uniqueness
            while (!isUnique) {
                generatedBonousCode = uuidv4();
                const existingCode = await User.findOne({ bonousCode: generatedBonousCode });
                if (!existingCode) {
                    isUnique = true;
                }
            }

            user.bonousCode = generatedBonousCode;
            user.bonousePoints = 14;

            // If the user has entered a bonousCode
            if (bonousCode) {
                const reffererUser = await User.findOne({ bonousCode: bonousCode });
                if (!reffererUser) return res.status(400).json({ message: "Incorrect Treasure Code..", success: false });

                reffererUser.bonousePoints = (reffererUser.bonousePoints || 0) + 10;
                await reffererUser.save();
                user.bonousePoints = 23;
            }
        }

        user.name = name;
        user.mobileNo = mobileNo;
        user.address = address;
        user.village = village;
        user.city = city;
        user.role = "CUSTOMER"

        await user.save();
        res.send({ user, success: true, message: "Account Updated successfully..!" });
    } catch (err) {
        console.log("Error in update ", err);
        res.json({ message: "Error updating user" });
    }
}


export default {
    getCurrentUser,
    createCurrentUser, 
    updateCurrentUser,
}

