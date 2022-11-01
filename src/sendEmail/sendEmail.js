import {Router} from "express";
import databasePool from '../models/db.js'
import nodemailer from "nodemailer";


const router = Router();

router.post("/", async(req, res) => {
    
    const reciver_mail = req.body.reciver_mail;
    const reciver_pass = req.body.reciver_pass;

    const contactEmail = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: reciver_mail,
          pass: reciver_pass
        },
      });
      
      await contactEmail.verify((error) => {
        if (error) {
          console.log(error);
          res.json({ code: 400, status: "email config is wrong" });
        } else {
          console.log("Ready to Send");
        }
      });

  

  const name = req.body.firstName + req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;
  const topic = req.body.topic;

  const mail = { 
    from: name,
    to: reciver_mail,
    subject: "Contact Form Submission - Portfolio",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>topic: ${topic}</p>
           <p>Message: ${message}</p>`, 
  };

  

  
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      console.log("errormessage ==> ", error.message)
      res.json({ code: 400, status: "Message is not Sent" });
    } else {
      res.json({ code: 200, status: "Message Sent" });
    }
  });
});


export { router as sendEmail }