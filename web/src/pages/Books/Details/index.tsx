import { useHistory, useRouteMatch } from 'react-router'
import styles from './styles.module.scss'
import { routes } from '../../../routes'

interface IParams {
  id: string
}

export function BookDetails() {
  const {params: { id }} = useRouteMatch<IParams>()
  const history = useHistory()
  
  function handleBack() {
    history.push(routes.books)
  }
  
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>
          {id ? 'Editar' : 'Adicionar'} - Livro
        </h1>
        <div className={styles.actionsContainer}>
          <button 
            className='backBtn'
            onClick={handleBack}
          >
            Voltar
          </button>
          <button className='deleteBtn'>Excluir</button>
          <button className='addBtn'>Salvar</button>
        </div>
      </header>

      <main className={styles.formContainer}>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="title">Título</label>
            <input id='title' type="text" />
          </div>
         

          <div className={styles.formGroup}>
            <label htmlFor="author">Autor</label>
            <input id='autor' type="text" />
          </div>
          
          <div className={styles.formUnit}>
            <div className={styles.formGroup}>
              <label htmlFor="amount">Quantidade</label>
              <input id='amount' type="number" />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="status">Status</label>
              <input id='status' type="text" />
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
