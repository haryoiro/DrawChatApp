import  * as Express from "express";
import  * as bodyParser from "body-parser";
import  * as cookieParser from "cookie-parser";

const port = process.env.PORT || 5000;

const app = Express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// ---- - ROUTES ----
app.get("/", async (req: Express.Request, res: Express.Response) => {
  try {
    res.end("Hello World");
  } catch (error) {
    console.error(`Error: ${error}`, error);
    res.status(500).send({ error: `${error}` });
  }
});

// ---- - LISTEN ----
app.listen(port, () => {
  console.log(`listening on port ${port}!`);
});

export default app;