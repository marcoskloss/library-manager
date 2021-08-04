import styles from './styles.module.scss'

export interface IHeaderButtons {
  onBack?: () => void
  onDelete?: () => void
  onAdd?: () => void
}

export interface IHeaderProps {
  title: string
  id?: string
  buttons?: IHeaderButtons
}

export function Header({ 
  title, 
  id, 
  buttons
}: IHeaderProps) {
  return (
      <header className={styles.header}>
        <h1>
          {id ? 'Editar' : 'Adicionar'} - { title }
        </h1>
        <div className={styles.actionsContainer}>

          { buttons?.onBack && ( <button 
            className='backBtn' 
            onClick={buttons?.onBack}
          >
            Voltar
          </button>) }

          { id && buttons?.onDelete && (
            <button 
              className='deleteBtn' 
              onClick={buttons?.onDelete}
            >
              Excluir
            </button>
          ) }

          { buttons?.onAdd && ( 
            <button
              className='addBtn'
              onClick={buttons?.onAdd}
            >
              { id ? 'Salvar' : 'Inserir' }
            </button>
          ) }
        </div>
      </header>
  )
}
