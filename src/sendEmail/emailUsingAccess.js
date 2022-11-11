import {Router} from "express";
import databasePool from '../models/db.js'
import {encrypt,decrypt} from "../helpers/encryptDecrypt.js"
import {accessTokenSecret,refreshTokenSecret,accessTokenExpiry,refreshTokenExpiry} from "../helpers/tokenConstants.js"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer";
import {checkAndCrop} from "../helpers/checkLengthAndCrop.js"

const router = Router();


const sendThatEmail = async(req,res,id,encryptedAccessToken) => {

    let firstName   = req.body.first_name;
    let lastName    = req.body.last_name;
    let fullName    = req.body.full_name;
    let senderEmail = req.body.email;
    let phone       = req.body.phone;
    let topic       = req.body.topic;
    let message     = req.body.message;
    const save      = req.body.save;

    //before sending save the email to the database
    if(save){
        const p_firstName   = checkAndCrop(firstName  ,32    ,30);
        const p_lastName    = checkAndCrop(lastName   ,32    ,30);
        const p_fullName    = checkAndCrop(fullName   ,32    ,30);
        const p_senderEmail = checkAndCrop(senderEmail,52    ,50);
        const p_phone       = checkAndCrop(phone      ,20    ,18);
        const p_topic       = checkAndCrop(topic      ,102   ,100);
        const p_message     = checkAndCrop(message    ,1002  ,1000);

        const insertedEmailInfo = await databasePool.query("INSERT INTO emailcontent (uuid,firstname,lastname,fullname,senderemail,topic,message,phone) VALUES ($1,$2,$3,$4,$5,$6,$7,$8);",[id,p_firstName,p_lastName,p_fullName,p_senderEmail,p_topic,p_message,p_phone]);
    
    }

    //get email and password from db to send email using access token
    const email_Password_from_db = await databasePool.query("select email,password from users where accesstoken = $1;",[encryptedAccessToken]);
    const userEmail = email_Password_from_db.rows[0].email;
    const encryptedUserPassword = email_Password_from_db.rows[0].password;
    const userPassword = decrypt(encryptedUserPassword);      

    const contactEmail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: userEmail,
            pass: userPassword
        },
    });
   
    contactEmail.verify((error) => {
            if (error) {
                return res.json({ code: 400, status: "email config is wrong" });
            } else {
                // console.log("Ready to Send"); 
                // ready to send
            }
    });
   

    let name = '';
    if(firstName === undefined){
        name = fullName
    }else{
        name = firstName
    }

    const mail = { 
    from: name,  
    to: userEmail,
    subject: "Contact Form Submission - Portfolio",
    html: `
        <p>first Name: ${firstName}</p>
        <p>las tName: ${lastName}</p>
        <p>full Name: ${fullName}</p>
        <p>sender Email: ${senderEmail}</p>
        <p>Phone number: ${phone}</p>
        <p>topic: ${topic}</p>
        <p>Message: ${message}</p>`, 
    };

    contactEmail.sendMail(mail, (error) => {
        if (error) {
            return res.json({ code: 400, status: "Message is not Sent" });
        } else {
            return res.json({ code: 200, status: "Message Sent" });
        }
    });

}

router.post("/", async(req, res) => {
    
    const accessToken = req.headers.authorization;
    const encryptedAccessToken = encrypt(accessToken)
    const singleUser = await databasePool.query("select id,email from users where accesstoken = $1;",[encryptedAccessToken]);
    if (singleUser.rowCount == 0 ){
        return res.status(400).send('Invalid access token')
    }

    jwt.verify(accessToken,accessTokenSecret, async (err, user) => {
        if (user) {
            req.user = user;
            sendThatEmail(req,res,singleUser.rows[0].id,encryptedAccessToken);
        } else if (err.message === "jwt expired") {
            return res.json({ success: false, message: "Access token expired" });
        } else {
            return res.status(403).json({ err, message: "User not authenticated" });
        }
    });

});


export { router as emailUsingAccess }