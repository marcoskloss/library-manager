import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../services/api';

interface ICreateUserResponse {
  error?: string;
  email?: string;
}

interface IUserCredentials {
  email: string;
  password: string;
}

interface IUser {
  email: string;
}

interface IAuthContext {
  signIn: (credentials: IUserCredentials) => Promise<void>;
  signOut: () => void;
  signUp: ({ email, password }: IUserCredentials) => Promise<void>;
  isAuthenticated: boolean;
  hasToken: boolean;
  user: IUser | null;
}

interface IAuthProvider {
  children: ReactNode;
}

const STORAGE_TOKEN_KEY = 'access-token';

const AuthContext = createContext({} as IAuthContext);

function AuthProvider({ children }: IAuthProvider) {
  const history = useHistory();
  
  const [user, setUser] = useState<IUser | null>(null);
  const isAuthenticated = !!user;
  const hasToken = !!localStorage.getItem(STORAGE_TOKEN_KEY);


  async function signUp({ email, password }: IUserCredentials): Promise<void> {
    try {
      const { data } = await api.post<ICreateUserResponse>('/users', {
        email,
        password
      });
  
      if (data.error) {
        alert('Usuário já cadastrado!');
        return;
      }
      
      await signIn({ email, password });
    } catch (error) {
      console.log(error);
      alert('Erro interno!');
      signOut();
    }
  }
  
  async function signIn({ email, password }: IUserCredentials): Promise<void> {
    try {
      const { data: { token, user } } = await api.post('/users/authenticate', {
        email,
        password
      });

      if (!token) {
        throw new Error('Falha na autenticação!');
      }

      setUser({ email: user.email });
      localStorage.setItem(STORAGE_TOKEN_KEY, token);
      api.defaults.headers.Authorization = `Bearer ${token}`;

      history.push('/home');
    } catch (error) {
      console.log(error);
      if (error instanceof Error)
        alert(error.message);
    }
  }

  const signOut = useCallback((): void => {
    api.defaults.headers.Authorization = undefined;
    localStorage.removeItem(STORAGE_TOKEN_KEY);
    setUser(null);
    history.push('/sign-in');
  }, [history])

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_TOKEN_KEY);
    if (!token) {
      api.defaults.headers.Authorization = undefined;
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;
    
    api.get('/me').then(response => {
      const { email } = response.data;
      setUser({ email });
    }).catch((error) => {
      console.log(error);
      alert('Erro interno!');
      signOut();
    });
  }, [signOut])
  
  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      signIn,
      signUp,
      signOut,
      user,
      hasToken
    }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): IAuthContext {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };