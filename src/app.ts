import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import accountRoutes from './routes/account.route';
import questionRoutes from './routes/question.route';
import candidateRoutes from './routes/candidate.route';
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/auth', accountRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/candidates', candidateRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Assessment Management API');
});

export default app;