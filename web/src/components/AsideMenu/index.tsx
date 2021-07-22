import { useState } from 'react'
import { AiOutlineMenuFold } from 'react-icons/ai'
import { Link, useHistory } from 'react-router-dom'
import { routes } from '../../routes'

import styles from './styles.module.scss'

const links = [
  { title: 'Home', path: routes.home },
  { title: 'Livros', path: routes.books },
  { title: 'Funcionários', path: routes.employees },
  { title: 'Minha Conta', path: routes.myaccount }
]

export function AsideMenu() {
  const history = useHistory()

  const [isCollapsed, setIsCollapsed] = useState(false)
  
  function handleCollapseMenu() {
    setIsCollapsed(prevState => !prevState)
  }

  function handleSignOut() {
    history.push('/login')
  }
  
  return (
    <aside className={
      `${styles.asideMenu} ${isCollapsed ? styles.collapsed : ''}` 
    }>
      <header>
        <h1>Library Manager</h1>
        <div onClick={handleCollapseMenu}>
          <AiOutlineMenuFold size={24}/>
        </div>
      </header>

      <ul className={styles.links}>
        {links.map(link => (
          <li key={link.title}>
            <Link to={link.path}>{link.title}</Link>
          </li>
        ))}
      </ul>

      <footer>
        <button onClick={handleSignOut}>Sair</button>
      </footer>
    </aside>
  )
}