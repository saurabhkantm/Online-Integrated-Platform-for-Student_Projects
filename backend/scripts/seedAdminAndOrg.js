import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDb from "../src/config/db.js";
import userModel from "../src/model/user.model.js";
import organizationModel from "../src/model/organization.model.js";

dotenv.config();

const seed = async()=>{
    await connectDb();
    try{
        let org = await organizationModel.findOne({code:"AKTU"});
        if(!org){
            org = organizationModel.create({
                name:"AKTU",
                code:"AKTU"
            })

            console.log(org.name);
        }else{
            console.log("organization aalready exists",org.name)
        }

        //craete admin
        const existingAdmin = await userModel.findOne({email:"saurabhkantmishra1234@gmail.com"});
        if(existingAdmin){
            console.log("Admin already exists")
        }else{
            const admin = await userModel.create({
                name:"saurabh",
                email:"saurabhkantmishra1234@gmail.com",
                role:"admin",
                password:"saurabh30",
                organization:org._id,
            })
            console.log("Admin created:",admin.email);
        }
    }catch(e){
        console.log("Seeding failed",e)
    }finally{
        await mongoose.connection.close();
        process.exit();
    }
}

seed()