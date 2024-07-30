import { Request, Response } from 'express';
import { AppDataSource } from '../utills/database';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const userRepository = AppDataSource.getRepository(User);

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = userRepository.create({
    username,
    password: hashedPassword
  });

  try {
    await userRepository.save(user);
    
    //res.status(201).send('User registered');

    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token, userId: user.id });

  } catch (error) {
    res.status(400).send('Error registering user');
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Invalid credentials');
  }

  const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
  res.json({ token, userId: user.id });
};
