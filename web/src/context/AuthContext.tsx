import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api, STORAGE_TOKEN_KEY } from '../services/api';

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
  signOut: () => Promise<void>;
  signUp: ({ email, password }: IUserCredentials) => Promise<void>;
  isAuthenticated: boolean;
  user: IUser | null;
  loading: boolean
}

interface IAuthProvider {
  children: ReactNode;
}

const AuthContext = createContext({} as IAuthContext);

function AuthProvider({ children }: IAuthProvider) {
  const history = useHistory();
  
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  async function disableLoading(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        setLoading(false);
        resolve();
      }, 350);
    })
  }
  
  async function signUp({ email, password }: IUserCredentials): Promise<void> {
    try {
      const { data } = await api.post<ICreateUserResponse>('/users', {
        email,
        password
      });
  
      if (!data.email) {
        alert('Erro interno!');
        return;
      }
      
      await signIn({ email: data.email, password });
    } catch (error) {
      console.log(error);
      alert('Usuário já cadastrado!');
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
      alert('Dados inválidos! :<');
    }
  }

  const signOut = useCallback(async (): Promise<void> => {
    api.defaults.headers.Authorization = null;
    localStorage.removeItem(STORAGE_TOKEN_KEY);
    setUser(null);
    history.push('/sign-in');
  }, [history])

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem(STORAGE_TOKEN_KEY);
      if (!token) {
        api.defaults.headers.Authorization = null;
        return;
      }
      
      api.defaults.headers.Authorization = `Bearer ${token}`;
      
      setLoading(true);
      try {
        const { data } = await api.get('/me');
        setUser({ email: data.email });
        disableLoading();
      } catch (error) {
        console.log(error);
        alert('Erro interno!');
        signOut();
        disableLoading();
      }
    })();
  }, [signOut]);

  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);
  
  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      loading,
      user,
      signIn,
      signUp,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): IAuthContext {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };