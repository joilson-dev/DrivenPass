import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import authRouter from './routers/authRouter';

const app = express();
app.use(express.json());

app.use('/auth', authRouter);

app.use(errorHandler);



app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});