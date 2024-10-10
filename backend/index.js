const express = require('express')
const app = express()

const userRoutes = require('./routes/User')
const profileRoutes = require('./routes/Profile')
const paymentRoutes = require('./routes/Payment')
const courseRoutes = require('./routes/Course')

const database = require('./config/database')
const cookieParse = require('cookie-parser')

const cors = require('cors')
const {cloudinaryConnect} = require('./config/clodinaryConfig')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv')

dotenv.config()

const PORT = process.env.PORT || 4000

database.connect()

//middlewares

app.use(express.json());
app.use(cookieParse());

app.use(cors({
    origin:'https://class-notion.vercel.app',
    credentials:true
}))

app.use(fileUpload({ 
    useTempFiles:true, 
    tempFileDir:"/tmp"
}))


//cloudinary connection 
cloudinaryConnect()
app.use("/api/v1/auth",userRoutes)
app.use("/api/v1/profile",profileRoutes)
app.use("/api/v1/course",courseRoutes)
app.use("/api/v1/payment",paymentRoutes)


app.get('/',(req,res)=>{
    return res.json({message:"Your app is running"})
})

app.listen(PORT,()=>{
    console.log("App is running at PORT")
})