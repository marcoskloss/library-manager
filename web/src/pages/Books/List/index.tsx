import { useHistory } from 'react-router-dom'
import { Table } from '../../../components/Table'
import { routes } from '../../../routes'
import styles from './styles.module.scss'

export function BooksList() {
  const history = useHistory()
  
  function handleAdd() {
    history.push(`${routes.books}/details/new`)
  }
  
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Livros</h1>
        <button onClick={handleAdd}>Adicionar</button>
      </header>

        <Table />
    </div>
  )
}