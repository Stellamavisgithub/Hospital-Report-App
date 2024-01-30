import {Request, Response, NextFunction} from 'express'
import { verifyToken } from '../utils/jwt'
import session from 'express-session';

const auth = (req:Request, res:Response, next:NextFunction) => {
try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "No token provided",
        error: "Unauthorised",
      });
    }
 
    const verify = verifyToken(token);
    if (!verify) {
      return res.status(401).json({
        message: "Invalid token",
        error: "Unauthorised",
      });
    }
 
    req.user = verify;
 
    next();
 
}
catch ( error: any) {
  console.log(error.message);
  res.status(500).json({
    message: 'Internal server error',
    error: error.message,
  })
}
 
}
 
export {auth}
