import jwt from "jsonwebtoken";
import { IUser } from "../interfaces/user.interface";
let env = require("../.env.json");


export const validateToken = async (token: any): Promise<any> => {
  try {
    return jwt.verify(token, env.secret);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export const createToken = (_user: IUser | null) => {
  const user = {
    _id: _user?._id,
    email: _user?.email
  }
  const accessToken = jwt.sign(user, env.secret);
  return {
    accessToken,
    user
  };
}

