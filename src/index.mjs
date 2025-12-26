import express from "express";
import router from "./routes/users.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import productsRouter from "./routes/products.mjs";

const app = express();

// when you want it to be sent by json format
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: "anson the dev",
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 60000 * 60, 
  }
}));
app.use(router);
app.use(productsRouter)
const PORT = process.env.PORT || 3000;

app.get("/", (request, response) => {
  console.log(request.session);
  console.log(request.session.id);
  request.session.visited = true;
  response.cookie("hello", "world", { maxAge: 10000 });
  response.status(201).send({ msg: "Hello" });
});

app.get("/cookie-test", (req, res) => {
  res.cookie("testcookie", "123", {
    path: "/",
    maxAge: 1000 * 60 * 5,
  });
  res.send("cookie set");
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});