import express from 'express';
import continent from './continent';

const router = express.Router();
router.use('/', continent);
export default router;
