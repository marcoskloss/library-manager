import './styles/global.css';

import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from './Routes';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Router>
  );
}

export default App;
