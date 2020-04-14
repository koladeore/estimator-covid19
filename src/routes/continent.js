import express from 'express';
import continentController from '../Controller/continent';

const continent = express.Router();
const CONTINENT_URL = '/on-covid-19';

continent.post(`${CONTINENT_URL}`, continentController.createJsonEstimator);
continent.post(`${CONTINENT_URL}/json`, continentController.createJsonEstimator);
continent.post(`${CONTINENT_URL}/xml`, continentController.createXmlEstimator);
continent.get(`${CONTINENT_URL}/logs`, continentController.getLogs);
export default continent;
