import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import {fileURLToPath} from 'url';

const logsDirectory = path.join(path.dirname(fileURLToPath(import.meta.url)), '../logs');
if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory);
}

//Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
    path.join(logsDirectory, 'access.log'), {flags: 'a'});

// Configure morgan to log in 'combined' format (Apache-style)
const logger = morgan('combined', {stream: accessLogStream});

export default logger;