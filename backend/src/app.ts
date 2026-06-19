import express from 'express';

const app = express();

import usersRoutes from './routes/users.routes';
import scoresRoutes from './routes/scores.routes';


app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/api/users', usersRoutes);
app.use('/api/scores', scoresRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;