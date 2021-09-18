import bcrypt from 'bcrypt';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { IUser } from '../../database';
import AuthService from '../../services/auth';

describe('AuthService', () => {
  test('hashPassword', async () => {
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    const salt = 8;
    const password = 'password';

    await AuthService.hashPassword(password, salt);
    expect(hashSpy).toHaveBeenCalledTimes(1);
    expect(hashSpy).toHaveBeenCalledWith(password, salt);
  });

  test('comparePassword', async () => {
    const compareSpy = jest.spyOn(bcrypt, 'compare');

    const password = 'password';
    const hashedPassword = 'ksfhakfeflk';

    await AuthService.comparePassword(password, hashedPassword);

    expect(compareSpy).toHaveBeenCalledTimes(1);
    expect(compareSpy).toHaveBeenCalledWith(password, hashedPassword);
  });

  test('generateToken', () => {
    const user: IUser = {
      email: 'user@email.com',
      password: '123123'
    }

    const signSpy = jest.spyOn(jwt, 'sign');
    const token = AuthService.generateToken(user);
    const AUTH_KEY = 'very_secret_key';

    expect(token).toBeDefined();
    expect(signSpy).toHaveBeenCalledTimes(1);
    expect(signSpy).toHaveBeenCalledWith(
      { email: user.email },
      AUTH_KEY,
      {
        expiresIn: '1d',
        subject: user.email
      }
    )
  });

  describe('decodeToken', () => {
    test('given a valid token it should return the payload', () => {
      const user: IUser = {
        email: 'user@email.com',
        password: '123123'
      }
      const token = AuthService.generateToken(user);
      const payload = AuthService.decodeToken(token);

      expect(payload).toMatchObject({
        email: user.email,
        sub: user.email 
      });
    });

    test('given a invalid token it should throw', () => {
      const token = 'invalid-token';
      expect.hasAssertions();
      
      try {
        AuthService.decodeToken(token);
      } catch (error) {
        expect(error).toBeInstanceOf(JsonWebTokenError);
      }
    });
  });
});