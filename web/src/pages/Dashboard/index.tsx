import { AsideMenu } from '../../components/AsideMenu'

import styles from './styles.module.scss'

export function Dashboard() {
  return (
    <div className={styles.container}>
      <AsideMenu 
        links={[
          { title: 'Home', path: '/' },
          { title: 'Livros', path: '/books' },
          { title: 'Meu Perfil', path: '/me' },
          { title: 'Funcionários', path: '/employees' }
        ]}
      />
      
      <main className={styles.main}>
        <p>main content</p>
      </main>
    </div>
  )
}