import {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom'
import { ILine, ITh, Table } from '../../../components/Table'
import fakeServer from '../../../fakeServer/fake-server'
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
  const [data, setData] = useState<ILine[]>([])
  
  async function getData(): Promise<ILine[]> {
    const response = await fakeServer.findAllBooks()
    return response.map(item => {
      return {
        id: item.id,
        title: item.title,
        author: item.author,
        amount: item.amount,
          status: item.status
      }
    })
  }

  function handleAdd() {
    history.push(`${routes.books}/details/`)
  }

  useEffect(() => {
    (async () => {
      const response = await getData()
      setData(response)
    })()
  }, [])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Livros</h1>
        <button onClick={handleAdd}>Adicionar</button>
      </header>

      <Table
        thList={thList}
        body={data}
      />
    </div>
  )
}
