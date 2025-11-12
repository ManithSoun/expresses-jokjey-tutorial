import express from "express";
import usersRouter from "./routes/users.mjs";

const app = express();

// when you want it to be sent by json format
app.use(express.json());

app.use(usersRouter)

const PORT = process.env.PORT || 3000;

// router.get("/", (request, response) => {
//   response.status(201).send({ msg: "Hello" });
// });

// router.get("/api/products", (request, response) => {
//   response.send([{ id: 123, name: "chicken breast", price: 12.99 }]);
// });

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
