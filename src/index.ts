import express, { NextFunction, Response, Request } from "express";
import usersRouter from "./routes/v1/users";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/v1/users', usersRouter);

app.use((req, res, next) => {
  if (res.headersSent) {
    next();
  } else {
    res.status(404).send('Unknown endpoint');
  }
});

// Errors handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.send(500).json({
    message: err.message,
    stack: err.stack
  });
});

app.listen(port, () => {
  console.log(`Bun Express app listening on port ${port}!`);
})