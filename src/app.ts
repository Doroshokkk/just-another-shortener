
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import shortenUrl from './routes/shortenUrl'
import resolveUrl from './routes/resolveUrl'
import redirectUrl from './routes/redirectUrl'

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); 

// Routes
app.use('/api', shortenUrl); //POST
app.use('/api', resolveUrl); //GET
app.use('', redirectUrl) //GET

export default app;