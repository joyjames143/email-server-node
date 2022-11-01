
import crypto from "crypto"

const securityKey = "b37zI0ES)Fmi6bx-U9rWx9b8S5Yx73.f"
const algorithm = "aes-256-cbc"
// const random16 = crypto.randomBytes(16).toString('base64').slice(0, 16)
const random16 = "txpu3m5q2XSBFtS/";


const encrypt = (encryptingString) => {
    const cipher = crypto.createCipheriv(algorithm, securityKey, random16);
    let encryptedData = cipher.update(encryptingString, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    return encryptedData;    
}
const decrypt = (decryptingString) => {
    const decipher =        crypto.createDecipheriv(algorithm, securityKey, random16);
    let decryptedData = decipher.update(decryptingString, "hex", "utf-8");
    decryptedData += decipher.final("utf8");
    return decryptedData;  
}

export { encrypt, decrypt};