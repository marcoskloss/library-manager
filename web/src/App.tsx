import { Switch, Route, useLocation } from 'react-router-dom';
import { Login } from './pages/Login'
import { Home } from './pages/Home';
import { routes } from './routes';
import { MyAccount } from './pages/MyAccount';

import pageContainerStyles from './styles/pageContainer.module.scss'
import { AsideMenu } from './components/AsideMenu';
import { Books } from './pages/Books';

function App() {
  const { pathname } = useLocation()
  
  return (
    <div className={pageContainerStyles.pageContainer}>
      { !/login/.test(pathname) && (<AsideMenu />) }
        <Switch>
          <Route path={routes.login}>
            <Login />
          </Route>

          <Route path={routes.myaccount}>
            <MyAccount />
          </Route>

          <Route path={routes.books}>
            <Books />
          </Route>

          <Route path={routes.home}>
            <Home />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
