import express, { NextFunction, Request, Response } from 'express';
import database, { seedDatabase } from './database';
import { authMiddleware } from './middlewares/auth';
import { router } from './routes';

function allowCrossDomain(
  req: Request,
  res: Response, 
  next: NextFunction): void | Response{
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Expose-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
}

(async (): Promise<void> => {
  const app = express();
  app.use(express.json());
  app.use(allowCrossDomain);
  
  await seedDatabase(database);

  app.use(router);

  app.get('/', authMiddleware, async (_: Request, res: Response): Promise<Response> => {
    return res.send('private info');
  });

  app.listen(3333, () => console.log('Its alive!'));
})();