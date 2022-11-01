import express ,{Router} from "express";
import databasePool from '../models/db.js'
import {encrypt,decrypt} from "../helpers/encryptDecrypt.js"
import { generateAccesstoken, generateRefreshToken } from "../helpers/genereteAccessRefresh.js";
import {accessTokenExpiry,refreshTokenExpiry} from "../helpers/tokenConstants.js"


const router = Router();


router.post("/getaccesstoken", async(req, res) => {
    const refreshtoken = req.query.refresh_token;
    const grantType = req.query.grant_type;
    if(grantType !== "refresh_token"){
        throw new Error("wrong grant type")
    }
    let output = {}
    try {
        const encryptedRefreshToken = encrypt(refreshtoken)
        const registeredUserInfo = await databasePool.query("select email from users where refreshtoken = $1;",[encryptedRefreshToken]);
        if (registeredUserInfo.rowCount == 0 ){
            res.status(400).send('Invalid refresh token')
            return
        }
        const email = registeredUserInfo.rows[0]["email"]
        const newAccessToken = generateAccesstoken(email)
        const encryptedAccessToken = encrypt(newAccessToken)
        await databasePool.query("UPDATE users SET accesstoken = $1 WHERE refreshtoken = $2;" ,[encryptedAccessToken,encryptedRefreshToken]);
        output["access_token"] = newAccessToken;
        output["expires_in"] = accessTokenExpiry;
        output["token_type"] = "Bearer";   
        res.json(output);  
    } catch (error) {
        res.json(error); 
    }  
});


export { router as tokens }