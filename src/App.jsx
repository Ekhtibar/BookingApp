import React from 'react'
import Header from './ui/Header/Header'
import style from './App.style.module.css'
import HomeScreen from './ui/HomeScreen/HomeScreen'
function App() {
  return (
    <div>
      <Header appName={'Моя гостиница'}/>
      <div className={style.topBar}>
        <div className={style.topBat__item}>Главная</div>
        <div className={style.topBat__item}>Список бронирований</div>
        <div className={style.topBat__item}>
          Уведомления
          <div className={style.puh_num}>10</div>
        </div>
      </div>
      <HomeScreen />
    </div>
  )
}

export default App