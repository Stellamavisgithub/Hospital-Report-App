import { config } from "dotenv";
import jwt from "jsonwebtoken";
 
config();
 
interface PayloadReturn {
  id: string;
  iat: number;
  exp: number;
}
 
const secret = process.env.JWT_SECRET || "";
 
function generateToken(id: string) {
  const token = jwt.sign({ id }, secret, { expiresIn: "3h" });
  return token;
}
 
function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, secret) as PayloadReturn;
    return decoded.id;
  } catch {
    return null;
  }
}
 
export { generateToken, verifyToken };
 