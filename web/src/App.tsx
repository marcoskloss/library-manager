import { Switch, Route, useLocation } from 'react-router-dom';
import { Login } from './pages/Login'
import { Home } from './pages/Home';
import { routes } from './routes';
import { MyAccount } from './pages/MyAccount';

import pageContainerStyles from './styles/pageContainer.module.scss'
import { AsideMenu } from './components/AsideMenu';
import { BooksList } from './pages/Books/List';
import { BookDetails } from './pages/Books/Details';

function App() {
  const { pathname } = useLocation()
  
  return (
    <div className={pageContainerStyles.pageContainer}>
      { !/login/.test(pathname) && (<AsideMenu />) }
        <Switch>
          <Route path={routes.login} component={Login} exact />

          <Route path={routes.myaccount} component={MyAccount} exact />
          
          <Route path={routes.books} component={BooksList} exact />
          <Route 
            path={`${routes.books}/details/:id?`} 
            component={BookDetails} 
            exact 
          />
          
          <Route path={routes.home} component={Home} exact/>
        </Switch>
    </div>
  );
}

export default App;
