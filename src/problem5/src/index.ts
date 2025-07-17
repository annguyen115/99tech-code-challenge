import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from './routes/user.route';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
