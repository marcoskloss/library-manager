import { useState } from 'react'
import { AiOutlineMenuFold } from 'react-icons/ai'

import styles from './styles.module.scss'

interface AsideMenuLink {
  path: string
  title: string
}

interface AsideMenuProps {
  links: AsideMenuLink[]
}

export function AsideMenu({ links,  }: AsideMenuProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  function handleCollapseMenu() {
    setIsCollapsed(prevState => !prevState)
    console.log('col')
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
            <a href={link.path}>{link.title}</a>
          </li>
        ))}
      </ul>

      <footer>
        <button>Sair</button>
      </footer>
    </aside>
  )
}