import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'user must have a name'],
        trim:true
    },
    email: {
        type:String,
        required:[true,'user must have an email'],
        lowercase:true,
        validate:[validator.isEmail,'please provide a valid email']
    },
    address:{
        type:String,
        required:[true,'user must have an address']
    },
    course:{
        type:String,
        required:[true,'user must have a course']
    }
})

const User = mongoose.model('User',userSchema);
export default User