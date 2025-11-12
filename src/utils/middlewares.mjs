import mockUsers from "./constants.mjs";

// Middleware:
export const resolveIndexByUserId = (request, response, next) => {
    const {
      body,
      params: { id },
    } = request;
  
    const parsedId = parseInt(id);
    if (isNaN(parsedId))
      return response.status(400).send({ msg: "Invalid user ID" });
  
    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  
    if (findUserIndex === -1) return response.sendStatus(404);
    request.findUserIndex = findUserIndex;
    request.parsedId = parsedId;
    next(); //next() does take arguments like error or null
  };

  export default resolveIndexByUserId;