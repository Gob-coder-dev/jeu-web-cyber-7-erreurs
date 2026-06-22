import express from 'express';

const app = express();

import usersRoutes from './routes/users.routes';
import scoresRoutes from './routes/scores.routes';
import leaderboardRoutes from './routes/leaderboard.routes';


app.use(express.json());

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/api/users', usersRoutes);
app.use('/api/scores', scoresRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;