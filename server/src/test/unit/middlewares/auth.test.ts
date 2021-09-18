import { NextFunction } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import AuthService from '../../../services/auth';
import { authMiddleware } from '../../../middlewares/auth';

describe('AuthMiddleware', () => {
  const request = {
    headers: {}
  } as any;

  const response = {
    status(code: number) {
      return this
    },
    json: jest.fn(),
    end: jest.fn()
  } as any;

  const next: NextFunction = jest.fn(); 
  jest.spyOn(response, response.status.name);

  beforeEach(() => request.headers = {});
  
  test('it should call next if access token is provided', async () => {
    const decodeTokenSpy = jest.spyOn(AuthService, 'decodeToken')
      .mockReturnValueOnce({ email: 'mail@mail.com' });

    request.headers['Authorization'] = 'Bearer access-token';

    authMiddleware(request, response, next);
    expect(request.user_email).toBe('mail@mail.com');
    expect(decodeTokenSpy).toHaveBeenCalledWith('access-token');
    expect(next).toHaveBeenCalled();
  });

  test('it should return 401 if no access token is provided', async () => {
    authMiddleware(request, response, next);
    
    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.end).toHaveBeenCalled();
  });

  test('it should return 401 if AuthService.decodeToken throws', async () => {
    const decodeTokenSpy = jest.spyOn(AuthService, 'decodeToken')
      .mockImplementationOnce(() => {
        throw new Error('Token error');
      });

    request.headers['Authorization'] = 'Bearer access-token';

    authMiddleware(request, response, next);
    
    expect(decodeTokenSpy).toHaveBeenCalledWith('access-token');
    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.json).toHaveBeenCalledWith({
      error: 'Token error'
    });
  });
});