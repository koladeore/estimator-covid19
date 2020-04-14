import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import { config } from 'dotenv';
import debug from 'debug';
import routes from './routes';

const app = express();
app.use(json());
app.use(urlencoded({ extended: false }));
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'controller/access.txt'), { flags: 'a' });
app.use(morgan(':method  :url  :status  :response-time ms', { stream: accessLogStream }));
config();
const { PORT } = process.env;
const log = debug('dev');
app.use('/api/v1', routes);
app.get('/', (req, res) => {
  res.status(200).send('The api is working');
});
app.listen(PORT, () => log(`App listening on port ${PORT}!`));
export default app;
