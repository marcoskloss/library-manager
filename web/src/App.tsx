import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>

        <Route path='/'>
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
