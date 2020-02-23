import { Response } from 'express';

const express: any = require('express');
const exApp: any = express();
const exPort: number | string = process.env.NODE_ENV || 5000;

exApp.get('/', (req: Request, res: Response) => {
  res.send('hello');
});

exApp.listen(exPort, () => {
  console.log(`server started at  http://localhost:${exPort}`);
});
