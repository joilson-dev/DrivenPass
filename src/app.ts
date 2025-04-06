import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import authRouter from './routers/authRouter';
import healthRouter from './routers/healthRouter';
import credentialRouter from './routers/credentialsRouter';
import userRouter from './routers/userRouter';

const app = express();
app.use(express.json());


app.use(healthRouter);
app.use('/auth', authRouter);
app.use('/credentials', credentialRouter);
app.use('/erase', userRouter);


app.use(errorHandler);



app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});