import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import requestLogger from './config/logger.js';
import {errorHandler, notFound} from './middlewares/error.middleware.js';
import {noteRoutes} from './routes/index.js'

const app = express();

// Middlewares
app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')));

// Routes
app.use('/notes', noteRoutes);
app.use(notFound);

app.use(errorHandler);
export default app;
