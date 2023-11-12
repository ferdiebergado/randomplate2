import express, { Router } from 'express';
import serverless from 'serverless-http';
import generate from '../../src/handler';

const api = express();
const router = Router();

router.use(express.urlencoded({ extended: true }));

router.post('/generate', async (req, res) => {
  const region = req.body.region;
  const plate = await generate(region);

  res.json(plate);
});

api.use('/api/', router);

export const handler = serverless(api);
