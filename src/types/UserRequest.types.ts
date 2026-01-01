import { Request } from "express";

export interface UserRequest extends Request {
    findUserIndex: number;
    parsedId: number;
  }
  