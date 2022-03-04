import { Ip } from "@nestjs/common"
import { Request } from "express";

export const logger=(req:Request,res:Response,next)=>{
 console.log('ip :',req.ip);
 next()
}