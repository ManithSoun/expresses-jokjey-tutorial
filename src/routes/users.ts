import { Router, Request, Response } from "express";
import {
  validationResult,
  checkSchema,
  matchedData,
} from "express-validator";
import {
  createUserValidationSchema,
  filterValidationSchema,
} from "../utils/validationSchemas.js";
import mockUsers from "../utils/constants.js";
import resolveIndexByUserId from "../utils/middlewares.js";

const router = Router();

//GET
router.get(
  "/api/users",
  checkSchema(filterValidationSchema),
  (request: Request, response: Response) => {
    const error = validationResult(request);
    console.log(error);

    // const {
    //   query: Query: { filter, value },
    // } = request;
    const { filter, value} = request.query as {
        filter?: string;
        value?: string;
    }

    //When filter and value are undefined
    if (filter && !value) {
      const keyword = filter.toLowerCase();
      const result = mockUsers.filter((user) =>
        Object.values(user).some((val) =>
          String(val).toLowerCase().includes(keyword)
        )
      );
      return response.json(result);
    }

    if (filter && value) {
      const result = mockUsers.filter((user) => user.username.includes(filter));
      return response.json(result);
    }

    return response.json(mockUsers);
  }
);

router.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  (request: Request, response: Response) => {
    const error = validationResult(request);
    console.log(error);

    if (!error.isEmpty())
      return response.status(400).send({ errors: error.array() });
    const { body } = request;

    const data = matchedData(request);
    console.log(data);

    const newId =
      mockUsers.length > 0
        ? Math.max(...mockUsers.map((user) => user.id)) + 1
        : 1;

    const newUser = { id: newId, ...body };

    return mockUsers.push(newUser), response.status(201).json(newUser);
  }
);

router.get("/api/users/:id", resolveIndexByUserId, (request: Request, response: Response) => {
  const user = mockUsers[request.findUserIndex!];
  return response.json(user);
});

router.get("/api/products", (request: Request, response: Response) => {
  response.send([{ id: 123, name: "chicken breast", price: 12.99 }]);
});

//PUT: we update the whole thing
router.put("/api/users/:id", resolveIndexByUserId, (request: Request, response: Response) => {
  mockUsers[request.findUserIndex!] = { id: request.parsedId!, ...request.body, };

  return response.sendStatus(200);
});

//PATCH: update only what we want to update
router.patch("/api/users/:id", resolveIndexByUserId, (request: Request, response: Response) => {
  mockUsers[request.findUserIndex!] = { ...mockUsers[request.findUserIndex!], ...request.body };
  return response.sendStatus(200);
});

//DELETE
router.delete(
  "/api/users/delete/:id",
  resolveIndexByUserId,
  (request: Request, response: Response) => {
    mockUsers.splice(request.findUserIndex!, 1);
    return response.sendStatus(200);
  }
);

export default router;



// import { Router } from "express";
// import {
//   query,
//   validationResult,
//   checkSchema,
//   matchedData,
// } from "express-validator";
// import {
//   createUserValidationSchema,
//   filterValidationSchema,
// } from "../utils/validationSchemas.js";
// import mockUsers from "../utils/constants.js";
// import resolveIndexByUserId from "../utils/middlewares.js";

// resolveIndexByUserId;

// const router = Router();

// //GET
// router.get(
//   "/api/users",
//   checkSchema(filterValidationSchema),
//   (request, response) => {
//     const error = validationResult(request);
//     console.log(error);

//     const {
//       query: { filter, value },
//     } = request;

//     //When filter and value are undefined
//     if (filter && !value) {
//       const keyword = filter.toLowerCase();
//       const result = mockUsers.filter((user) =>
//         Object.values(user).some((val) =>
//           String(val).toLowerCase().includes(keyword)
//         )
//       );
//       return response.send(result);
//     }

//     if (filter && value) {
//       const result = mockUsers.filter((user) => user.username.includes(filter));
//       return response.send(result);
//     }

//     return response.send(mockUsers);
//   }
// );

// router.post(
//   "/api/users",
//   checkSchema(createUserValidationSchema),
//   (request, response) => {
//     const error = validationResult(request);
//     console.log(error);

//     if (!error.isEmpty())
//       return response.status(400).send({ errors: error.array() });
//     const { body } = request;

//     const data = matchedData(request);
//     console.log(data);

//     const newId =
//       mockUsers.length > 0
//         ? Math.max(...mockUsers.map((user) => user.id)) + 1
//         : 1;

//     const newUser = { id: newId, ...body };

//     return mockUsers.push(newUser), response.status(201).send(newUser);
//   }
// );

// router.get("/api/users/:id", resolveIndexByUserId, (request, response) => {
//   const { findUserIndex } = request;
//   const findUser = mockUsers[findUserIndex];

//   if (!findUser) return response.sendStatus(404);
//   return response.send(findUser);
// });

// router.get("/api/products", (request, response) => {
//   response.send([{ id: 123, name: "chicken breast", price: 12.99 }]);
// });

// //PUT: we update the whole thing
// router.put("/api/users/:id", resolveIndexByUserId, (request, response) => {
//   const { body, findUserIndex, parsedId } = request;
//   mockUsers[findUserIndex] = { id: parsedId, ...body };

//   return response.sendStatus(200);
// });

// //PATCH: update only what we want to update
// router.patch("/api/users/:id", resolveIndexByUserId, (request, response) => {
//   const { body, findUserIndex } = request;
//   mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
//   return response.sendStatus(200);
// });

// //DELETE
// router.delete(
//   "/api/users/delete/:id",
//   resolveIndexByUserId,
//   (request, response) => {
//     const { findUserIndex } = request;
//     mockUsers.splice(findUserIndex, 1);
//     return response.sendStatus(200);
//   }
// );

// export default router;

