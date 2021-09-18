import AuthService from '../../../services/auth';
import { UserController } from '../../../controllers/user';
import database from '../../../database';

describe('UserController', () => {
  beforeEach(() => database.users = []);
  const user = {
    email: 'user@mail.com',
    password: 'skfisef1ru0qqFLKjAS'
  }
  
  const response = {
    status(code: number) {
      return this
    },
    json: jest.fn()
  } as any

  const request = {
    body: {}
  } as any

  const statusSpy = jest.spyOn(response, response.status.name);
  
  describe('create', () => {
    test('given a new user it should call database.set and call res.json with user email', async () => {
      const databaseGetSpy = jest.spyOn(database, 'get')
        .mockResolvedValueOnce(null);
      const databaseSetSpy = jest.spyOn(database, 'set');

      request.body = {
        ...user
      }

      const userController = new UserController();
      await userController.create(request, response);

      expect(databaseGetSpy).toBeCalledWith(request.body.email);
      expect(databaseSetSpy).toHaveBeenCalledWith(user);
      expect(statusSpy).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalledWith({
        email: user.email
      })
    });

    test('given already existent user it should return 409 and error message in the response', async () => {
      jest.spyOn(database, 'get')
        .mockResolvedValueOnce(user);

      request.body = {
        ...user
      }

      const userController = new UserController();
      await userController.create(request, response);

      expect(statusSpy).toHaveBeenCalledWith(409);
      expect(response.json).toHaveBeenCalledWith({
        error: 'User already exists!'
      });
    });
  });

  describe('authenticate', () => {
    test('given valid user credentials it should sign and return a access token', async () => {
      const databaseGetSpy = jest.spyOn(database, 'get')
        .mockResolvedValueOnce({ ...user, password: 'hashed-password' });
      
      const comparePasswordSpy = jest.spyOn(AuthService, 'comparePassword')
        .mockResolvedValueOnce(true);
      
      const token = 'access-token';
      const generateTokenSpy = jest.spyOn(AuthService, 'generateToken')
        .mockReturnValueOnce(token);

      const userController = new UserController();
      await userController.authenticate(request, response);

      expect(databaseGetSpy).toHaveBeenCalledWith(user.email);
      expect(comparePasswordSpy).toHaveBeenCalledWith(
        user.password,
        'hashed-password'
      );
      expect(generateTokenSpy).toHaveBeenCalledWith({
        ...user,
        password: 'hashed-password'
      });
      expect(response.json).toHaveBeenCalledWith({
        token,
        user: {
          ...user,
          password: 'hashed-password'
        }
      });
    });

    test('given invalid user credentials it should return 403 and error message', async () => {
      jest.spyOn(database, 'get')
        .mockResolvedValueOnce(null);
    
      request.body.email = '';
        
      const userController = new UserController();
      await userController.authenticate(request, response);

      expect(response.status).toHaveBeenCalledWith(403);
      expect(response.json).toHaveBeenCalledWith({
        error: 'Email/Password does not match!'
      });
    });

    test('given invalid user credentials it should return 403 and error message', async () => {
      jest.spyOn(database, 'get')
        .mockResolvedValueOnce(user);
      
      jest.spyOn(AuthService, 'comparePassword')
        .mockResolvedValueOnce(false);
    
      request.body.password = '';
        
      const userController = new UserController();
      await userController.authenticate(request, response);

      expect(response.status).toHaveBeenCalledWith(403);
      expect(response.json).toHaveBeenCalledWith({
        error: 'Email/Password does not match!'
      });
    });
  });

  test('listUsers', async () => {
    const findAllUsersSpy = jest.spyOn(database, 'findAllUsers')
      .mockResolvedValue([user.email]);

    const userController = new UserController();
    await userController.listUsers(request, response);

    expect(findAllUsersSpy).toHaveBeenCalled();
    expect(response.json).toHaveBeenCalledWith([user.email]);
  });

  describe('me', () => {
    test('it should return the user information', async () => {
      const databaseGetSpy = jest.spyOn(database, 'get')
        .mockResolvedValueOnce(user);
      
      request.user_email = user.email;

      const userController = new UserController();
      await userController.me(request, response);

      expect(databaseGetSpy).toHaveBeenCalledWith(request.user_email);
      expect(response.json).toHaveBeenCalledWith({ email: user.email });
    });

    test('it should return null if no use_email is provided in request', async () => {
      request.user_email = '';

      const userController = new UserController();
      await userController.me(request, response);

      expect(response.json).toHaveBeenCalledWith(null);
    });

    test('it should return null if user information was not found', async () => {
      const databaseGetSpy = jest.spyOn(database, 'get')
        .mockResolvedValueOnce(null);
    
      request.user_email = 'newmail@mail.com';

      const userController = new UserController();
      await userController.me(request, response);

      expect(response.json).toHaveBeenCalledWith(null);
    });
  });
});