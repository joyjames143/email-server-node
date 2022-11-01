import jwt from "jsonwebtoken"
import {accessTokenSecret,refreshTokenSecret,accessTokenExpiry,refreshTokenExpiry} from "./tokenConstants.js"

const generateAccesstoken = (payload) => {
    const accessToken = jwt.sign( {name: payload}, accessTokenSecret, { expiresIn: accessTokenExpiry});
    return accessToken
}

const generateRefreshTokenb = (payload) => {
    const refreshToken = jwt.sign( {name: payload}, refreshTokenSecret, { expiresIn: refreshTokenExpiry});
    return refreshToken
}

export {generateAccesstoken,generateRefreshTokenb}