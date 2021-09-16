import { Switch, Route, RouteProps } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Home } from './pages/Home';
import { SignIn } from './pages/public/SignIn';
import { SignUp } from './pages/public/SignUp';

interface ICustomRouteProps extends RouteProps {
  isPrivate?: boolean
}

function CustomRoute({ isPrivate, ...rest }: ICustomRouteProps) {
  const { isAuthenticated } = useAuth();
  
  if (!isPrivate ) {
    return <Route {...rest} component={SignIn} />
  } 
  
  return <Route {...rest} />
}

export function Routes() {
  return (
    <Switch>
      <CustomRoute exact path='/sign-in' component={SignIn} />
      <CustomRoute exact path='/sign-up' component={SignUp} />
      <CustomRoute isPrivate exact path='/home' component={Home} />
    </Switch>
  );
}
