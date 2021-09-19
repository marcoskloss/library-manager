import { Switch, Route, RouteProps, Redirect } from 'react-router-dom';
import { Loading } from './components/Loading';
import { useAuth } from './context/AuthContext';
import { Home } from './pages/Home';
import { SignIn } from './pages/public/SignIn';
import { SignUp } from './pages/public/SignUp';

interface ICustomRouteProps extends RouteProps {
  isPrivate?: boolean
}

function CustomRoute({ isPrivate, ...rest }: ICustomRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <Loading />
  }
  
  if (isPrivate && !isAuthenticated) {
    return <Redirect to='/sign-in' />
  } 

  if (!isPrivate && isAuthenticated) {
    return <Redirect to='/home' />
  }
  
  return <Route {...rest} />
}

export function Routes() {
  return (
    <Switch>
      <CustomRoute exact path='/sign-in' component={SignIn} />
      <CustomRoute exact path='/sign-up' component={SignUp} />
      <CustomRoute isPrivate exact path='/home' component={Home} />

      <CustomRoute exact path='/' component={SignIn} />
    </Switch>
  );
}
