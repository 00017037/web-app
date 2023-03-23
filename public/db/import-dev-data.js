import mongoose from "mongoose";
import dotenv from 'dotenv'
import { users } from "./students-db.js";
import User from "../models/userModel.js";
import process from 'process'

dotenv.config({path:'./config.env'})

const DB = process.env.DB
console.log(process.env.DB)
console.log(process.env.PORT,'port')
console.log(DB)
mongoose.connect(DB, {useNewUrlParser: true,
    useUnifiedTopology:true
   }).then(()=>{
    console.log('DB connection successfull');
})

const importData = async ()=> {
    try{
        await  User.create(users);
        console.log('Data successfully loaded');
    } catch(err){
        console.log(err)
    }
    process.exit()
}

const deleteData = async()=>{
    try{
        await User.deleteMany();
        console.log('data deleted successfully')
    } catch(err){
        console.log(err)

    }
    process.exit()
}

if(process.argv[2]=='--import'){
    importData();
} else if(process.argv[2]==='--delete'){
    deleteData()
}