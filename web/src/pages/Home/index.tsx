import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

export function Home() {
  const { signOut } = useAuth();
  const [usersList, setUsersList] = useState<string[]>([]);
  
  useEffect(() => {
    api.get('/users')
      .then(response => setUsersList(response.data));
  }, []);
  
  return (
    <div style={{ padding: '25px' }}>
      <p>Secret page 🧐!</p>
      <p>
        Aqui você pode ver uma lista secreta com todos os integrantes do nosso club!
      </p>
      <ul>
        { usersList.map(user => {
          return <li key={user}>{user}</li>
        }) }
      </ul>

      <Button title='Sair' type='button' onClick={signOut} />
    </div>
  );
}