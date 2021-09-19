import React, { useState } from 'react';
import styles from '../styles/publicGlobal.module.css';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import * as validate from '../../../data/validations';
import { IFieldError } from '../../../data/errors';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

export function SignUp() {
  const { signUp } = useAuth();
  
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<IFieldError>();
  
  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>): Promise<void> {
    ev.preventDefault();

    if (!validate.validateEmail(email)) {
      setError({
        field: 'email',
        message: 'Email inválido!'
      });
      return;
    }

    if (!validate.validatePassword(password)) {
      setError({
        field: 'password',
        message: 'A senha deve ter mais que 6 caracteres!'
      });
      return;
    }

    setError(undefined);
    
    await signUp({ email, password });
  }
  
  return (
    <div className={styles.registrationContainer}>
      <div className={styles.formBox}>
        <header>
          <h1>Bem-vindo!</h1> 
          <p>Crie uma conta e entre no nosso <strong>Secret Club</strong></p>
        </header>

        <form onSubmit={handleSubmit}>
          <Input 
            name='email' 
            label='Email' 
            type='text'
            required
            error={error?.field === 'email' ? error : undefined}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <Input 
            name='password' 
            label='Senha'
            type='password'
            required
            error={error?.field === 'password' ? error : undefined}
            onChange={(ev) => setPassword(ev.target.value)}
          />

          <small>
            <Link to='/sign-in'>
              Já possui uma conta?
            </Link>
          </small>
          <Button title='Entrar' type='submit' />
        </form>
      </div>

      <div className={styles.imageBox} />
    </div>
  );
}

