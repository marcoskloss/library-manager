import AuthService from "./services/auth";

export interface IUser {
  email: string;
  password: string;
}

export interface IDatabase {
  users: IUser[];
  set: (user: IUser) => Promise<void>;
  get: (email: string) => Promise<IUser | null>
}

export async function seedDatabase(db: IDatabase, userSeeds: IUser[]): Promise<void> {
  const hashedPasswords = await Promise.all(userSeeds.map(user => {
    return AuthService.hashPassword(user.password);
  }))
  
  const promises = userSeeds.map(user => {
    return db.set({...user});
  })

  await Promise.all(promises);
}

class Database implements IDatabase {
  users: IUser[] = [];
  
  public async set(user: IUser): Promise<void> {
    this.users.push({
      email: user.email,
      password: (await AuthService.hashPassword(user.password))
    });
    return Promise.resolve();
  }

  public async get(email: string): Promise<IUser | null> {
    const user = this.users.find(u => u.email === email);
    if (!user) return Promise.resolve(null);
    return Promise.resolve({ ...user });
  }

  public async findAllUsers(): Promise<string[]> {
    return Promise.resolve(this.users.map(user => { return user.email }));
  }
}

export default new Database();