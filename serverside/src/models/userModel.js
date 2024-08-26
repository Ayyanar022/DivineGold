import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    auth0Id:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    name:{type:String},
    mobileNo:{type:Number}, // number
    address:{type:String},
    village:{type:String},   
    city:{type:String},   
    role:{type:String},
    bonousCode:{type:String,unique:true ,sparse: true },
    bonousePoints:{type:Number} // number
})

const User = mongoose.model('User',userSchema)
export default User;