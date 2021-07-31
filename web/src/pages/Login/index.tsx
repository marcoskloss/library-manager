import styles from './styles.module.scss'
import { useHistory } from "react-router-dom";

export function Login() {
  const history = useHistory()
  
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    history.push('/')
  }
  
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <header>
          <p>
            Bem-vindo ao <strong>Library Manager</strong>
          </p>
        </header>
        
        <div className={styles.formGroup}>
          <label htmlFor='email'>Email</label>
          <input id='email' type="text" />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Senha</label>
          <input id='password' type="password" />
        </div>

        <div className={styles.actionsContainer}>
          <button 
            className={styles.submitBtn}
            onClick={handleSubmit}
          >
            Entrar
          </button>
          <a href="/" className={styles.forgotPassword}>Esqueci minha senha</a>
        </div>
      </form> 
    </div>
  )
}
