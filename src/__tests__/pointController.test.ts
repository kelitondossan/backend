import request from 'supertest';
import app from '../../express';
import { getRepository } from 'typeorm';
import { User } from '../../src/entities/User';
import { createConnection, getConnection } from 'typeorm';

describe('Point Controller', () => {
  let userId: number | undefined;  
  beforeAll(async () => {
    await createConnection();
    const userRepository = getRepository(User);
    const user = userRepository.create({ username: 'testuser', password: 'testpassword' });
    await userRepository.save(user);
    userId = user.id;
  });

  afterAll(async () => {
    await getConnection().close();
  });

  it('should start a shift', async () => {
    if (userId === undefined) {
      throw new Error('userId is undefined');
    }

    const response = await request(app)
      .post('/api/points/start')
      .send({ userId });
    expect(response.status).toBe(201);
    expect(response.text).toBe('Shift started');
  });

  
});
