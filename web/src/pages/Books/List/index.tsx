import { useHistory } from 'react-router-dom'
import { ILine, ITh, Table } from '../../../components/Table'
import { routes } from '../../../routes'
import styles from './styles.module.scss'

const thList: ITh[] = [
  {
    title: 'Autor',
    name: 'author',
    order: 0
  },
  {
    title: 'Título',
    name: 'title',
    order: 1
  },
  {
    title: 'Quantidade',
    name: 'amount',
    order: 2
  },
  {
    title: 'Status', 
    name: 'status',
    order: 3
  }
]

export function BooksList() {
  const history = useHistory()
  
  function getData(): ILine[] {
    return [
      { 
        id: '1', 
        author: 'Autor X', 
        title: 'Livro X', 
        amount: 7, 
        status: 'Disponível'
      },
      { 
        id: '2', 
        author: 'Autor Y', 
        title: 'Livro Y', 
        amount: 0, 
        status: 'Indisponível'
      }
    ]
  }

  function handleAdd() {
    history.push(`${routes.books}/details/`)
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Livros</h1>
        <button onClick={handleAdd}>Adicionar</button>
      </header>

      <Table
        thList={thList}
        body={getData()}
      />
    </div>
  )
}
