import express from 'express';
import logger from 'morgan';
import { connectToDb } from './db';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT: number = 3000;
const logLevel = process.env.LOG_LEVEL || 'dev';
const env = process.env.NODE_ENV;

// Middleware - logs server requests to console
if (env !== 'test') {
  app.use(logger(logLevel));
}

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to typescript backend!');
})

app.use('/api/users', userRoutes);

app.listen(PORT,() => {
    console.log('The application is listening on port http://localhost:' + PORT);
})

connectToDb()


