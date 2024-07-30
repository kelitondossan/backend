import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import { Point } from '../entities/Point';

export const AppDataSource = new DataSource({
  type: 'postgres', // ou 'mysql' dependendo do banco de dados que você está usando
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'pointdb',
  entities: [User, Point],
  synchronize: true,
});

export default AppDataSource;

/*import { createConnection } from 'typeorm'

export const connectDatabase = async () => {
  try {
    await createConnection({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'pointdb',
      entities: [__dirname + '/../entities/*.ts'],
      synchronize: true,
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};

export default connectDatabase
*/