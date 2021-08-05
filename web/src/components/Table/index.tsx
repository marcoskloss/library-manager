import styles from './styles.module.scss'

export interface ITh {
  name: string
  title: string
  order: number
}

export interface ILine {
  id: string
  [key: string]: string | number
}

export interface ITableProps {
  thList: ITh[]
  body: ILine[]
}

interface ITBodyProps {
  body: ILine[]
  thList: ITh[]
}

function TBody({body, thList}: ITBodyProps) {
  if (!body.length) {
    return (
      <tbody>
        <tr>
          { thList.map(th => {
            return (
              <td key={th.name} className={styles.emptyBody}></td>
            )
          }) }
        </tr>
      </tbody>
    )
  }

  return (
    <tbody>
        { body.map(line => {
          return (
            <tr key={line.id}>
              { thList.map(th => {
                const value = line[th.name]
                return (
                  <td 
                    key={line.id + th.name}
                    className={
                      `${typeof value === 'number' ? styles.tdNumber : ''}`
                    }
                  >
                    {value}
                  </td>
                )
              }) }
            </tr>
          )
        }) }
    </tbody>
  )
}

export function Table({ thList , body }: ITableProps) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          { thList.map(it => <th key={it.name}>{it.title}</th>) }
        </tr>
      </thead>
      <TBody body={body} thList={thList} />
    </table>
  )
}
