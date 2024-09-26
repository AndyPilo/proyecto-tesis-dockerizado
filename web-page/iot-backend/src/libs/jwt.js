import { TOKEN_SECRET } from "../config/config.js"
import jwt from "jsonwebtoken";

export function createAccessToken (payload){
    return new Promise((resolve,reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: "600s",
            },
            (error,token) => {
                if(error) reject;
                resolve(token);
            }
        )
    })
}

