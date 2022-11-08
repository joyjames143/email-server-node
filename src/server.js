import express ,{json,Router} from "express";
import cors from "cors";
import nodemailer from 'nodemailer';
//routes imports
import { registerUser } from "./registerUser/registerUser.js";
import { sendEmail } from "./sendEmail/sendEmail.js";
import { tokens } from "./tokens/tokens.js";
import { emailUsingAccess } from "./sendEmail/emailUsingAccess.js"   
import {databaseQuery} from "./databaseQuery/databaseQuery.js"
import {recieveRecords} from "./recieveRecords/recieveRecords.js"

const corsOptions = {origin : process.env.URL || "*"}
const app = express();
const router = Router();
const PORT = process.env.PORT || 5001;

//middleware 
app.use(cors(corsOptions)); 
app.use(json());
app.use("/", router);
 

//routes
app.use("/registerUser", registerUser)
app.use("/recieverecords",recieveRecords)
app.use("/contact", sendEmail)
app.use("/tokens",tokens)
app.use("/sendemail",emailUsingAccess)
app.use("/dbquery",databaseQuery)

router.get("/",(req,res)=>{
  res.send("email-server is now live")
})

app.listen(PORT,()=>{console.log(`server is listining in port : ${PORT}`)}); 