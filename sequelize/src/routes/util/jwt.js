const jwt = require("jsonwebtoken");
const secretKey = require("../config/secretKey").secretKey;
const option = require("../config/secretKey").option;
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;
module.exports = {
    sign :async(isUserExist) =>{
        const payload = {
            id : isUserExist.id,
            email: isUserExist.email,
            nick : isUserExist.nick,
        };
        const result = {
            token : jwt.sign(payload,secretKey,option),
        }
        return result;
    },
    verify: (token) => {
        let decoded;
        try{
            decoded = jwt.verify(token,secretKey);
        }catch(err){
            if(err.message === 'jwt expired'){
                return TOKEN_EXPIRED;
            } else if(err.message === 'invalid token'){
                return TOKEN_INVALID;
            }else {
                return TOKEN_INVALID;
            }
        }
        return decoded
    }
}



