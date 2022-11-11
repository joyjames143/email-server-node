import express ,{json,Router} from "express";
import cors from "cors";
import nodemailer from 'nodemailer';

//routes imports
import { registerUser } from "./users/registerUser.js";
import { sendEmail } from "./sendEmail/sendEmail.js";
import { tokens } from "./tokens/tokens.js";
import { emailUsingAccess } from "./sendEmail/emailUsingAccess.js"   
import {databaseQuery} from "./databaseQuery/databaseQuery.js"
import {recieveRecords} from "./records/recieveRecords.js"
import {deleteRecord} from "./records/deleteRecord.js"
import {loginUser} from "./users/loginUser.js"
import {deleteUser} from "./users/deleteUser.js"
import {updatePassword} from "./users/updateUserPassword.js"

//to use htmlpage in node--------------------
import * as path from 'path';
import { fileURLToPath } from 'url';
import {dirname} from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//--------------------------------------------

const corsOptions = {origin : process.env.URL || "*"}
const app = express();
const router = Router();
const PORT = process.env.PORT || 5001;

//middleware 
app.use(cors(corsOptions));  
app.use(json());
app.use("/", router);
 

//routes
//users
app.use("/registeruser", registerUser)
app.use("/deleteuser", deleteUser)
app.use("/updatepassword", updatePassword)
app.use("/loginuser", loginUser)
//records
app.use("/recieverecords",recieveRecords)
app.use("/deleterecord",deleteRecord)


app.use("/contact", sendEmail)
app.use("/tokens",tokens)
app.use("/sendemail",emailUsingAccess)
app.use("/dbquery",databaseQuery)

router.get("/",(req,res)=>{
// to load html page in node
  res.sendFile(path.join(__dirname+'/index.html'));
})

app.listen(PORT,()=>{console.log(`server is listining in port : ${PORT}`)}); 