import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router'
import styles from './styles.module.scss'
import { routes } from '../../../routes'
import fakeServer from '../../../fakeServer/fake-server'
import { Header } from '../../../components/Header'
import { Form } from '../../../components/Form'
import { InputText } from '../../../components/Inputs/InputText'
import {IFormRef} from '../../../components/Form/Hooks/FormContext'

interface IParams {
  id: string
}

export function BookDetails() {
  const {params: { id }} = useRouteMatch<IParams>()
  const history = useHistory()

  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)

  const formRef = useRef<IFormRef>(null)
  
  function handleBack(): void {
    history.push(routes.books)
  }

  async function handleSubmit(): Promise<void> {
    try {
      await fakeServer.storeNewBook({
        id: new Date().getTime().toString(),
        title,
        status: 'Disponível',
        amount,
        author
      })

      alert('Adicionado com sucesso!')
      handleBack()
    } catch (err) {
      console.log(err)
      alert('Não foi possível adicionar :/')
    }
  }

  async function handleDelete(): Promise<void> {
    try {
      await fakeServer.deleteBook(id)
    } catch (err) {
      console.log(err)
      alert('erro delete')
    }
  }

  useEffect(() => {
    formRef.current?.setFocus('title') 
  }, [])
  
  return (
    <div className={styles.container}>
      <Header 
        title='Livro'
        id={id}
        buttons={{
          onAdd: handleSubmit,
          onBack: handleBack,
          onDelete: handleDelete
        }}
      />

        <main className={styles.formContainer}>
        <Form onSubmit={handleSubmit} ref={formRef}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Título</label>
            <InputText
              id='title' 
              name='title'
              type="text" 
              value={title}
              onChange={(ev: ChangeEvent<HTMLInputElement>) => setTitle(ev.target.value)}
            />
          </div>
         

          <div className={styles.formGroup}>
            <label htmlFor="author">Autor</label>
            <input 
              id='author' 
              type="text"
              value={author}
              onChange={(ev) => setAuthor(ev.target.value)}
            />
          </div>
          
          <div className={styles.formUnit}>
            <div className={styles.formGroup}>
              <label htmlFor="amount">Quantidade</label>
              <input 
                id='amount' 
                type="number" 
                value={amount}
                onChange={(ev) => setAmount(Number(ev.target.value))}
              />
            </div>
          </div>
          <button className='addBtn' type='submit'>Salvar</button>
        </Form>
      </main>
    </div>
  )
}
