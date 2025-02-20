import React from 'react'
import style from './heroInfo.style.module.css'
import HeroInfoItem from '../HeroInfoItem/HeroInfoItem'

const HeroInfo = () => {
  return (
    <div className={style.heroInfo}>
        <HeroInfoItem title={'Забронировано'} number={18} bgColor={'#4EA8DE'}/>
        <HeroInfoItem title={'Доступно'} number={27} bgColor={'#8284FA'}/>
        <HeroInfoItem title={'На уброке'} number={5} bgColor={'#5E60CE'}/>
    </div>
  )
}

export default HeroInfo