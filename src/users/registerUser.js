import {Router} from "express";
import databasePool from '../models/db.js'
import {encrypt} from "../helpers/encryptDecrypt.js"
import { generateAccesstoken, generateRefreshToken} from "../helpers/genereteAccessRefresh.js";
import {accessTokenExpiry,refreshTokenExpiry} from "../helpers/tokenConstants.js"
//postgresql querys
const select_all_users = "SELECT id,email,servicename FROM users;"
const select_trainer_anatomy_by_trainer_id = "SELECT * FROM trainersAnatomy WHERE trainerid = $1 ;"
const insert_users_into_users_table = "INSERT INTO users (email,password,servicename,accesstoken,refreshtoken) VALUES ($1,$2,$3,$4,$5) RETURNING id;"
const update_trainer_anatomy_by_trainer_id = "UPDATE trainersAnatomy SET trainerid = $1, bodyfat = $2, height = $3, weight = $4, traineeIds = $5, otherdetails = $6  WHERE trainerid = $7;"
const delete_trainer_anatomy_by_trainer_id = "DELETE FROM trainersAnatomy WHERE trainerid = $1 ;"


const router = Router();

   
router.get("/",async(req,res) => {
    try {
        const allUserInfo = await databasePool.query(select_all_users);
        console.log(allUserInfo.rows)
        res.json(allUserInfo.rows);
    } catch (error) { 
        res.json("error in getting users list")
        console.log(error.message)
    }
})



router.post("/", async(req,res)=>{

    const emailAddress = req.body.email;   
    const password = req.body.password;
    const service = req.body.service;
    const encryptedPassword = encrypt(password)
    const accessToken = generateAccesstoken(emailAddress)
    const refreshToken = generateRefreshToken(emailAddress)
    const encryptedAccessToken = encrypt(accessToken)
    const encryptedRefreshToken = encrypt(refreshToken)
    
    // const decrypteddatais = decrypt(encryptedPassword,securityKey, algorithm ,random16)
    var output = {};
    var errorOutput = {};
    try {
        
        const checkquery = await databasePool.query("select email from users where email =$1" ,[emailAddress]);
        if (checkquery.rowCount > 0){
            if (checkquery.rows[0].email === emailAddress){
                throw new Error("email address already exists")
            }
        }

        const registerUserInfo = await databasePool.query(insert_users_into_users_table,[emailAddress, encryptedPassword, service,encryptedAccessToken,encryptedRefreshToken]);
        output["access_token"] = accessToken
        output["refresh_token"] = refreshToken
        output["access_token_expires_in"] = `${accessTokenExpiry} seconds`
        output["refresh_token_expires_in"] = `${refreshTokenExpiry} seconds`
        res.json(output);       
    } catch (error) { 
        if (error.code == "23505"){
            errorOutput["error_message"] = error.detail
        }else{    
            errorOutput["error_message"] = error.message
        }
        errorOutput["created"] = false
        res.json(errorOutput)
        console.log(error)
    }
})
 


export { router as registerUser }