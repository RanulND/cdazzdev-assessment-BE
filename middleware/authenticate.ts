import jwt from "jsonwebtoken"
import { errorResponse } from "../utils/responses";
import { Response } from "express";
import { UserRequest } from "../utils/types/userRequest";


module.exports = (res : Response, req: UserRequest, next:() =>{}) => {
  try {
    const token = req.headers.authorization? req.headers.authorization.split(" ")[1]:"";
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
    req.userData = decodedToken;
    next();
  } catch (e) {
    return errorResponse(res, "Unauthorized Access",401);
  }
};
