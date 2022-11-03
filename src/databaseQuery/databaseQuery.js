import {Router} from "express";
import databasePool from '../models/db.js'
import nodemailer from "nodemailer";


const router = Router();

router.post("/", async(req, res) => {
    
    const query = req.body.query;
try {
    const registerUserInfo = await databasePool.query(query);
    return res.json(registerUserInfo);
} catch (error) {
    return res.json(error)
}
    
});


export { router as databaseQuery } 