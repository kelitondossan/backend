// types/express.d.ts
import { User } from './src/entities/User'; // Certifique-se de que o caminho está correto

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}
