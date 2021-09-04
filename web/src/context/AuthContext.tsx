import { createContext, ReactNode, useContext, useState } from "react";
import { useHistory } from "react-router";

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IUser {
  email: string;
}

interface IAuthContext {
  signIn: (credentials: ISignInCredentials) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  user?: IUser;
}

interface IAuthProvider {
  children: ReactNode;
}

const AuthContext = createContext({} as IAuthContext);

function AuthProvider({ children }: IAuthProvider) {
  const history = useHistory();
  
  const [user, setUser] = useState<IUser>();
  let isAuthenticated = true;

  async function signIn({ email, password }: ISignInCredentials): Promise<void> {
    setUser({ email });

    return Promise.resolve();
  }

  function signOut(): void {
    isAuthenticated = false;
    history.push('/sign-in');
  }
  
  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      signIn,
      user,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): IAuthContext {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };