import dotenv  from 'dotenv';
import mongoose from 'mongoose'

dotenv.config()



export const connectDB = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Database connected ${connect.connection.host}`);
    } catch (error) {
        console.log("Error connection in database",error);
        process.exit(1);
        
    }

}