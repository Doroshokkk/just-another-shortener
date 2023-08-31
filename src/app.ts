
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import shortenUrl from './routes/shortenUrl.js'
import resolveUrl from './routes/resolveUrl.js'
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); 

// Routes
app.use('/api', shortenUrl);
app.use('/api', resolveUrl);

export default app;