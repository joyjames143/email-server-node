import {Router} from "express";
import databasePool from '../models/db.js'
import {encrypt} from "../helpers/encryptDecrypt.js"
import { generateAccesstoken, generateRefreshToken} from "../helpers/genereteAccessRefresh.js";
import {accessTokenExpiry,refreshTokenExpiry} from "../helpers/tokenConstants.js"
//postgresql querys
const updateAccessRefresh = "UPDATE users SET accesstoken = $1,refreshtoken=$2 WHERE email=$3 RETURNING id;"

const router = Router();

router.post("/", async(req,res)=>{

    const emailAddress = req.body.email;   
    const password = req.body.password;
    const encryptedPassword = encrypt(password)
    const accessToken = generateAccesstoken(emailAddress)
    const refreshToken = generateRefreshToken(emailAddress)
    const encryptedAccessToken = encrypt(accessToken)
    const encryptedRefreshToken = encrypt(refreshToken)
    
    // const decrypteddatais = decrypt(encryptedPassword,securityKey, algorithm ,random16)
    var output = {};
    var errorOutput = {};
    try {
        
        const checkquery = await databasePool.query("select email,password from users where email =$1" ,[emailAddress]);
        if (checkquery.rowCount > 0){
            if (checkquery.rows[0].email === emailAddress){
                if (checkquery.rows[0].password === encryptedPassword){
                    const loginUserInfo = await databasePool.query(updateAccessRefresh,[encryptedAccessToken,encryptedRefreshToken,emailAddress]);
                    output["access_token"] = accessToken
                    output["refresh_token"] = refreshToken
                    output["access_token_expires_in"] = `${accessTokenExpiry} seconds`
                    output["refresh_token_expires_in"] = `${refreshTokenExpiry} seconds`
                    res.json(output);    
                }else{
                    throw new Error("password is wrong")
                } 
            }else{
                throw new Error("email address doesnot exists")
            }
        }else{
            throw new Error("email address doesnot exists")
        }

        
    } catch (error) { 
        if (error.code == "23505"){
            errorOutput["error_message"] = error.detail
        }else{    
            errorOutput["error_message"] = error.message
        }
        res.json(errorOutput)
        console.log(error)
    }
})
 


export { router as loginUser }