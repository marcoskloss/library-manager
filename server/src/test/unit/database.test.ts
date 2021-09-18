import AuthService from "../../services/auth";
import database, { IDatabase, IUser, seedDatabase } from "../../database";

describe('database', () => {
  beforeEach(() => database.users = []);
  
  const fakeUser: IUser = {
    email: 'email@email.com',
    password: '123123'
  }
  
  test('seedDatabase', async () => {
    const fakeDb = {
      get: jest.fn(),
      set: jest.fn(),
      users: []
    } 

    await seedDatabase(fakeDb as IDatabase, [fakeUser]);
    
    expect(fakeDb.set).toHaveBeenCalledTimes(1);
    expect(fakeDb.set).toHaveBeenCalledWith(fakeUser);
  });

  test('set', async () => {
    const hashedUserPassword = await AuthService.hashPassword(fakeUser.password);
    jest.spyOn(AuthService, 'hashPassword')
      .mockResolvedValueOnce(hashedUserPassword);

    await database.set(fakeUser);

    expect(database.users)
    .toEqual(
      expect.arrayContaining([
        expect.objectContaining({
            email: fakeUser.email,
            password: hashedUserPassword
        })
      ])
    );
  });

  test('findAllUsers', async () => {
    database.users.push(fakeUser);
    database.users.push(fakeUser);
    database.users.push(fakeUser);
    database.users.push(fakeUser);

    const expectedValues = [
      fakeUser.email,
      fakeUser.email,
      fakeUser.email,
      fakeUser.email,
    ]
    
    const userList = await database.findAllUsers();
    expect(userList).toEqual(
      expect.arrayContaining(expectedValues)
    );
  });

  describe('get', () => {
    test('it should return the user email when the given email match', async () => {
      database.users.push(fakeUser);
      const user = await database.get(fakeUser.email);
      expect(user).toEqual(fakeUser);
    });

    test('it should return null when the given email doesnt match', async () => {
      database.users.push(fakeUser);
      const user = await database.get('someemail@mail.com');
      expect(user).toBeNull();
    });
  });
});