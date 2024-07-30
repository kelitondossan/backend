import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './src/routes/authRoutes';
import pointRoutes from './src/routes/pointRoutes';
import AppDataSource from './src/utills/database';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(cors({
  origin: 'http://localhost:3001', 
}));

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/points', pointRoutes);

AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
