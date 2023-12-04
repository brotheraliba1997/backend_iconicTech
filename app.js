const crouse = [
    {
        id: 1,
        name: "maths",
        jawan: "nodejs"
    },
    {
        id: 2,
        name: "programing",
        jawan: "ract js",
    },

    {
        id: 3,
        name: "workstation",
        jawan: "react native",
    },
]


const express = require("express")
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const port = 5000;

app.use(express.json()) 
const indexRoute = require('./routes/index.js');
// midle wear

app.use("/" , indexRoute)



app.get("/indus/:id", (req,res) => {
    let id = req.params.id
    let obj = crouse.find((x) => x.id == id)
    if(obj){
        res.send(obj).status(200)
    } else {
        res.send("no data found").status(404)
    }  
})


app.post("/booking", (req,res) => {
    const book = req.body;
    console.log(book)
    res.send("created")
})


app.post('/register', async (req, res) => {
    const { username, password } = req.body;
   
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = ({ username, password: hashedPassword });
    console.log(user, "user")

    res.status(201).json({ message: 'User registered successfully' });
    res.status(404).json({ message: 'invalid api' });

});


app.post('/send-email', async (req,res) => {
    const {to, subject, text} = req.body

    const emailSender = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: "hamzaali1997.h@gmail.com",
            pass: "bqjkurpxuoeelaxj"
        }
    })

    console.log(emailSender, "emailSender")


    const foundEmailOppsiteSide = {
        from: "hamzaali1997.h@gmail.com",
        to,
        subject,
        text
    };




    try{
        await emailSender.sendMail(foundEmailOppsiteSide)
        res.json({message: "Email sent successfully"})
    } catch(err){
        res.status(500).json({error: "failed to sent email"})
    }


})

    // mongoose.connect(process.env.MONGO_URL).then((res) => {
    //     console.log("database  connected successfully")
    //     app.listen(process.env.PORT, () => {
    //         console.log("server is runing on 5000")
    //     })
    // }).catch((err) => {
    //     console.log(err)
    // })


    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
      });







