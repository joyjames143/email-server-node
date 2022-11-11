import {Router} from "express";
import databasePool from '../models/db.js'
import {uuidFromAccessToken} from "../helpers/uuidFromAccessToken.js"
import {encrypt} from "../helpers/encryptDecrypt.js"
import { generateAccesstoken, generateRefreshToken} from "../helpers/genereteAccessRefresh.js";
import {accessTokenSecret,accessTokenExpiry,refreshTokenExpiry} from "../helpers/tokenConstants.js"
import jwt from "jsonwebtoken"

//postgresql querys
const select_all_users = "SELECT id,email,servicename FROM users;"

const router = Router();
   
router.post("/", async(req,res)=>{

    const accessToken = req.headers.authorization;
    var output = {};
    var errorOutput = {}; 

    try {
        const uu_id = await uuidFromAccessToken(accessToken);

        //check access token validity
        jwt.verify(accessToken,accessTokenSecret, async (err, user) => {
            if (user) {
                req.user = user;
            } else if (err.message === "jwt expired") {
                return res.json({ success: false, message: "Access token expired" });
            } else {
                return res.status(403).json({ err, message: "User not authenticated" });
            }
        }); 

        const registerUserRecordInfo = await databasePool.query("select id,firstname,lastname,fullname,senderemail,topic,message,phone  from emailcontent where uuid = $1;",[uu_id]);
        output["records"] = registerUserRecordInfo.rows
        return res.json(output);
    } catch (error) {
        errorOutput["error_message"] = error.message
        return res.json(errorOutput) 
    }  
}) 
 


export { router as recieveRecords }