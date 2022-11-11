import {Router} from "express";
import databasePool from '../models/db.js'
import {encrypt} from "../helpers/encryptDecrypt.js"
import { generateAccesstoken, generateRefreshToken} from "../helpers/genereteAccessRefresh.js";
import {accessTokenExpiry,refreshTokenExpiry} from "../helpers/tokenConstants.js"
//postgresql querys

const router = Router();

router.delete("/:id", async(req,res)=>{
    var output = {};
    var errorOutput = {};  
    const recordId = req.params.id
    const accessToken = req.headers.authorization;
    const encryptedAccessToken = encrypt(accessToken)

    try {
        //check access token validity
        const singleUser = await databasePool.query("select id,email from users where accesstoken = $1;",[encryptedAccessToken]);
        if (singleUser.rowCount == 0 ){
            return res.status(400).send('Invalid access token')
        }
        const checkemail = await databasePool.query("delete from emailcontent where id = $1 ",[recordId]);
        if (checkemail.rowCount >0){
            output["deleted"] = true
            return res.json(output);
        }else{
            throw new Error("enter a valid id ")
        }
    } catch (error) {   
        errorOutput["error_message"] = error.message
        errorOutput["deleted"] = false
        return res.json(errorOutput)
    }
})
 


export { router as deleteRecord }