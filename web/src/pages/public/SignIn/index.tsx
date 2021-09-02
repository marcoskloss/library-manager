import styles from '../publicGlobal.module.css';

export function SignIn() {
  return (
    <div className={styles.registrationContainer}>
      <div className={styles.formBox}>
        <header>
          <h1> Bem-vindo novamente!</h1> 
          <p> Entre na sua conta do <strong>Library Manager</strong></p>
        </header>

        <form>
          <div className={styles.formGroup}>
            <label htmlFor='email'>Email</label>
            <input type='text' id='email' placeholder='Email' />
          </div>

          <div className={styles.formGroup}>
              <label htmlFor='password'>Senha</label>
            <input type='password' id='password' placeholder='Senha' />
          </div>

          <button type='submit'>Entrar</button>
        </form>
      </div>

      <div className={styles.imageBox} />
    </div>
  );
}

