const express=require("express")
const cors=require("cors")

const { connection } = require("./config/db")
const { BookRouter } = require("./routers/bookData.router.js");
const { UserRouter } = require("./routers/userData.router.js");


const app=express()

app.use(express.json())
app.use(cors({
    origin: 'https://backend-books-assginment-ikjj.vercel.app/', // Allow requests from this origin
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true // Allow cookies and authorization headers
}));

app.get("/", (req, res) => {
    res.send("Welcome to the home page");
});

app.use("/data",BookRouter)
app.use("/user",UserRouter)

app.listen(process.env.port,async(req,res)=>{
    try {
        await connection
        console.log("Db is connected")
    } catch (error) {
        console.log("Db is not connected")
    }
    console.log(`server is listening to ${process.env.port}`)
})

