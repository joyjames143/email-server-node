import {Router} from "express";
import databasePool from '../models/db.js'
import {encrypt} from "../helpers/encryptDecrypt.js"
import { generateAccesstoken, generateRefreshToken} from "../helpers/genereteAccessRefresh.js";
import {accessTokenExpiry,refreshTokenExpiry} from "../helpers/tokenConstants.js"
//postgresql querys

const router = Router();

router.delete("/", async(req,res)=>{
    var output = {};
    var errorOutput = {};
    const emailAddress = req.body.email;   
    const accessToken = req.headers.authorization;
    const encryptedAccessToken = encrypt(accessToken)

    try {
        //check access token validity
        const singleUser = await databasePool.query("select id,email from users where accesstoken = $1;",[encryptedAccessToken]);
        if (singleUser.rowCount == 0 ){
            return res.status(400).send('Invalid access token')
        }

        
        const checkemail = await databasePool.query("select id,email from users where accesstoken = $1 ",[encryptedAccessToken]);
        if (checkemail.rowCount >0){
            if(checkemail.rows[0].email === emailAddress){
                await databasePool.query("BEGIN TRANSACTION;");
                await databasePool.query("delete from emailcontent where uuid = $1 ",[checkemail.rows[0].id]);
                await databasePool.query("delete from users where id = $1 ",[checkemail.rows[0].id]);
                await databasePool.query("END TRANSACTION;");
                output["deleted"] = true
                return res.json(output); 
            }else{
                throw new Error("give correct email address for that access token")
            }
        }
        
    } catch (error) {   
        await databasePool.query("ROLLBACK;");
        errorOutput["error_message"] = error.message
        errorOutput["deleted"] = false
        return res.json(errorOutput)
        console.log(error)
    }

})
 


export { router as deleteUser }