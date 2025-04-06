import { Router } from 'express';

const healthRouter = Router();

healthRouter.get('/health', (req, res) => {
  res.status(200).json({ message: "I’m OK!" });
});

export default healthRouter;
