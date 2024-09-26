import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "../config/config.js";

export const auhtRequired = (req,res,next) => {
    const {token} = req.cookies;

    if(!token) return res.status(401).json({message: "No autorizado"});

    jwt.verify(token, TOKEN_SECRET, (error,user) => {
        if(error) return res.status(403).json({message: "Token invalido"});

        req.user = user;
        console.log(user);
        next();
    })

}