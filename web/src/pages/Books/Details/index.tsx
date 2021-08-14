import { useEffect, useRef } from 'react'
import { useHistory, useRouteMatch } from 'react-router'
import * as yup from 'yup'
import styles from './styles.module.scss'
import { routes } from '../../../routes'
import fakeServer from '../../../fakeServer/fake-server'
import { Header } from '../../../components/Header'
import { Form } from '../../../components/Form'
import { InputText } from '../../../components/Inputs/InputText'
import {IFormRef} from '../../../components/Form/Hooks/FormContext'
import {InputNumber} from '../../../components/Inputs/InputNumber'

interface IParams {
  id: string
}

export function BookDetails() {
  const {params: { id }} = useRouteMatch<IParams>()
  const history = useHistory()

  const formRef = useRef<IFormRef>(null)
  
  function handleBack(): void {
    history.push(routes.books)
  }

  async function handleSubmit(): Promise<void> {
    try {
      const data = formRef.current?.getData()
      
      const schema = yup.object().shape({
        title: yup.string().required('O Título é obrigatório!'),
        author: yup.string().required('O Autor é obrigatório!'),
        amount: yup.number().required('A Quantidade é obrigatória!')
      })

      
      await schema.validate(data, { abortEarly: false })

      await fakeServer.storeNewBook(data)

      alert('Adicionado com sucesso!')
      handleBack()
    } catch (err) {
      if (err instanceof yup.ValidationError)
        formRef.current?.setFormErrors(err)
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
            <InputText
              id='title' 
              name='title'
              label='Título'
              placeholder='Título'
            />
          </div>
         

          <div className={styles.formGroup}>
            <InputText
              id='author' 
              name='author'
              label='Autor'
              placeholder='Autor'
            />
          </div>
          
          <div className={styles.formUnit}>
            <div className={styles.formGroup}>
              <InputNumber
                id='amount' 
                name='amount'
                label='Quantidade'
                placeholder='1'
                defaultValue={1}
              />
            </div>
          </div>
          <button className='addBtn' type='submit'>Salvar</button>
        </Form>
      </main>
    </div>
  )
}
