
import { Request, Response, NextFunction } from "express";
import mockUsers from "./constants";


// Middleware:
export const resolveIndexByUserId = (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    
    const parsedId = Number(id);
    if (Number.isNaN(parsedId))
      return response.status(400).send({ msg: "Invalid user ID" });
  
    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  
    if (findUserIndex === -1) return response.sendStatus(404);
    request.findUserIndex = findUserIndex;
    request.parsedId = parsedId;
    next(); //next() does take arguments like error or null
  };

  export default resolveIndexByUserId;
  
// import mockUsers from "./constants.mjs";

// // Middleware:
// export const resolveIndexByUserId = (request, response, next) => {
//     const {
//       body,
//       params: { id },
//     } = request;
  
//     const parsedId = parseInt(id);
//     if (isNaN(parsedId))
//       return response.status(400).send({ msg: "Invalid user ID" });
  
//     const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  
//     if (findUserIndex === -1) return response.sendStatus(404);
//     request.findUserIndex = findUserIndex;
//     request.parsedId = parsedId;
//     next(); //next() does take arguments like error or null
//   };

//   export default resolveIndexByUserId;