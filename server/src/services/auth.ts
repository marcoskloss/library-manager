import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from 'src/database';

const AUTH_KEY = 'very_secret_key';

type IPayload = Omit<IUser, 'password'>;

export default class AuthService {
  public static async hashPassword(
    password: string,
    salt = 8
  ): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  public static async comparePassword(
    password: string, 
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  public static decodeToken(token: string): IPayload {
    return jwt.verify(token, AUTH_KEY) as IPayload;
  }

  public static generateToken(user: IUser): string {
    return jwt.sign(
      { email: user.email }, 
      AUTH_KEY, 
      {
        expiresIn: '1d',
        subject: user.email
      }
    )
  }
}