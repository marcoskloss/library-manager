import styles from './styles.module.scss'

export function Table() {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Título</th>
          <th>Autor</th>
          <th>Quantidade</th>
          <th>Categoria</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Titulo teste</td>
          <td>Autor teste</td>
          <td>7</td>
          <td>Ação</td>
          <td>Disponível</td>
        </tr>
        <tr>
          <td>O Cortiço</td>
          <td>Aluísio</td>
          <td>0</td>
          <td>Romance</td>
          <td>Indisponível</td>
        </tr>
      </tbody>
    </table>
  )
}