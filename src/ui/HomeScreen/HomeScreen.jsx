import React from 'react'
import style from './homeScreen.style.module.css'
import HeroInfo from './components/HeroInfo/HeroInfo'

const HomeScreen = () => {
  return (
    <div className={style}>
      <HeroInfo />
    </div>
  )
}

export default HomeScreen