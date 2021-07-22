import styles from './styles.module.scss'

export function Books() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Livros</h1>
        <button>Adicionar</button>
      </header>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Categoria</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Titulo teste</td>
              <td>Autor teste</td>
              <td>Ação</td>
              <td>Disponível</td>
            </tr>
            <tr>
              <td>O Cortiço</td>
              <td>Aluísio</td>
              <td>Romance</td>
              <td>Indisponível</td>
            </tr>
          </tbody>
        </table>
    </div>
  )
}