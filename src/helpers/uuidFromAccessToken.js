import {encrypt} from "./encryptDecrypt.js"
import databasePool from '../models/db.js'
import jwt from "jsonwebtoken"
import {accessTokenSecret,refreshTokenSecret,accessTokenExpiry,refreshTokenExpiry} from "./tokenConstants.js"

const InvalidAccesstokenError = 'access token not available';

const uuidFromAccessToken = async(accessToken) => {

        const encryptedAccessToken = encrypt(accessToken)

        const singleUser = await databasePool.query("select id,email from users where accesstoken = $1;",[encryptedAccessToken]);
        if (singleUser.rowCount == 0 ){
            throw new Error(InvalidAccesstokenError);
        }

        
        

        

        const uu_id = singleUser.rows[0].id;
        return uu_id;
}

export {uuidFromAccessToken}