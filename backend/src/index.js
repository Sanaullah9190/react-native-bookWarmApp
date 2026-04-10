import dotenv from 'dotenv';
import express from 'express'
import cors from "cors";
import cookieParser from 'cookie-parser'
import { connectDB } from './lib/db.js';

dotenv.config();

const app = express()
const PORT = process.env.PORTS || 3000



app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true, limit: "20kb" }))
app.use(express.static("public"))
app.use(cookieParser())


// import Router 
import authRoute from './routes/authRoute.js'
import bookRoute from './routes/booksRoute.js';

app.use('/api/auth',authRoute)
app.use('/api/books',bookRoute)



connectDB()
    .then(() => {
        app.listen(PORT,'0.0.0.0', () => {
            console.log(`server is running on PORT: ${PORT}`);
        })
    })
    .catch(() => {
        console.log("error in start the server");

    })
