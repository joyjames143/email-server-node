import express ,{json,Router} from "express";
import cors from "cors";


import nodemailer from 'nodemailer';

// server used to send send emails

const router = express.Router();
const app = express();
app.use(cors());
app.use(json());
app.use("/", router);


router.post("/contact", async(req, res) => {
    
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
        } else {
          console.log("Ready to Send");
        }
      });



  const name = req.body.firstName + req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;
  const mail = { 
    from: name,
    to: reciver_mail,
    subject: "Contact Form Submission - Portfolio",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Message: ${message}</p>`, 
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json(error);
    } else {
      res.json({ code: 200, status: "Message Sent" });
    }
  });
});


const PORT = process.env.PORT || 5001;
app.listen(PORT,()=>{console.log(`server is listining in port : ${PORT}`)}); 