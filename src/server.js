import express ,{json,Router} from "express";
import cors from "cors";
import nodemailer from 'nodemailer';
//routes imports
import { registerUser } from "./registerUser/registerUser.js";
import { sendEmail } from "./sendEmail/sendEmail.js";
import { tokens } from "./tokens/tokens.js";
import { emailUsingAccess } from "./sendEmail/emailUsingAccess.js"   

const corsOptions = {origin : process.env.URL || "*"}
const app = express();
//middleware 
app.use(cors(corsOptions)); 
app.use(json());
app.use("/", router);


//routes
app.use("/registerUser", registerUser)
app.use("/contact", sendEmail)
app.use("/tokens",tokens)
app.use("/sendemail",emailUsingAccess)

router.get("/",(req,res)=>{
  res.send("email-server is now live")
})

router.post("/contact", async(req, res) => {
    
    const reciver_mail = req.body.reciver_mail;
    const reciver_pass = req.body.reciver_pass;
 
 console.log("eeeeeeeeeeeee",reciver_mail);
 console.log("ppppppppppppp",reciver_pass);

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


const PORT = process.env.PORT || 5001;
app.listen(PORT,()=>{console.log(`server is listining in port : ${PORT}`)}); 
