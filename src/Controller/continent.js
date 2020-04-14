import convert from 'xml-js';
import fs from 'fs';
import path from 'path';
import covid19ImpactEstimator from '../estimator';

class Continents {
  static async createJsonEstimator(req, res) {
    try {
      const data = req.body;
      const estimator = covid19ImpactEstimator(data);
      return res.status(201).json(estimator);
    } catch (e) {
      return res.status(500).json({ status: 500, message: e.message });
    }
  }

  static async createXmlEstimator(req, res) {
    try {
      const data = req.body;
      const estimator = covid19ImpactEstimator(data);
      const options = { compact: true, ignoreComment: true, spaces: 4 };
      const result = convert.json2xml(estimator, options);
      return res.status(200).send(result);
    } catch (e) {
      return res.status(500).json({ status: 500, message: e.message });
    }
  }

  static async getLogs(req, res) {
    try {
      const logs = (fs.readFileSync(path.join(__dirname, 'access.txt'))).toString();
      return res.status(200).send(logs);
    } catch (e) {
      return res.status(500).json({ status: 500, message: e.message });
    }
  }
}
export default Continents;
