import { AsideMenu } from '../../components/AsideMenu'

import globalStyle from '../../styles/pageContainer.module.scss'


export function Home() {
  return (
    <div className={globalStyle.pageContainer}>
      <AsideMenu />
      
      <main className={globalStyle.main}>
        <p>HOME</p>
      </main>
    </div>
  )
}