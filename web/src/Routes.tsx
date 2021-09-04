import { 
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps
} from 'react-router-dom';
import { Home } from './pages/Home';
import { Public } from './pages/public/Public';

interface ICustomRouteProps extends RouteProps {
  isPrivate?: boolean
}

function CustomRoute({ isPrivate, ...rest }: ICustomRouteProps) {
  if (!isPrivate) return <Route {...rest} component={Public} />
  
  //validate
  return <Route {...rest} />
}

export function Routes() {
  return (
    <Router>
      <Switch>
        <CustomRoute exact path='/sign-in' component={Public} />
        <CustomRoute exact path='/sign-up' component={Public} />
        <CustomRoute isPrivate exact path='/home' component={Home} />
      </Switch>
    </Router>
  );
}
