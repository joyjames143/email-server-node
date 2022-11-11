import {Router} from "express";
import databasePool from '../models/db.js'
import {encrypt,decrypt} from "../helpers/encryptDecrypt.js"
import { generateAccesstoken, generateRefreshToken} from "../helpers/genereteAccessRefresh.js";
import {accessTokenExpiry,refreshTokenExpiry} from "../helpers/tokenConstants.js"
//postgresql querys
const select_all_users = "SELECT id,email,servicename FROM users;"
const select_trainer_anatomy_by_trainer_id = "SELECT * FROM trainersAnatomy WHERE trainerid = $1 ;"
const insert_users_into_users_table = "INSERT INTO users (email,password,servicename,accesstoken,refreshtoken) VALUES ($1,$2,$3,$4,$5) RETURNING id;"
const update_trainer_anatomy_by_trainer_id = "UPDATE trainersAnatomy SET trainerid = $1, bodyfat = $2, height = $3, weight = $4, traineeIds = $5, otherdetails = $6  WHERE trainerid = $7;"
const delete_trainer_anatomy_by_trainer_id = "DELETE FROM trainersAnatomy WHERE trainerid = $1 ;"


const router = Router();

router.put("/", async(req,res)=>{
    var output = {};
    var errorOutput = {};
    const password = req.body.password;
    const encryptedPassword = encrypt(password)
    const accessToken = req.headers.authorization;
    const encryptedAccessToken = encrypt(accessToken)

    try {
        const updatedUserPassword = await databasePool.query("UPDATE users SET password = $1 where accesstoken = $2 ",[encryptedPassword,encryptedAccessToken]);
        //--------for dev purpose only ---------for checking if password is updated successfully because it is stored as a encrypted 
        // const retrivedPassword = await databasePool.query("select password from users where accesstoken = $1",[encryptedAccessToken]);
        // console.log(decrypt(retrivedPassword.rows[0].password))
        output["updated"] = true
        res.json(output); 
    } catch (error) {  
        errorOutput["error_message"] = error.message
        errorOutput["updated"] = false
        res.json(errorOutput)
        console.log(error)
    }

})
 


export { router as updatePassword }