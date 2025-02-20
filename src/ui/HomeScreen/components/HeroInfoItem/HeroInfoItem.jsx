import React from 'react'
import style from './heroInfoItem.style.module.css'

const HeroInfoItem = ( { title, number, bgColor} ) => {
  return (
    <div className={style.heroInfoItem} style={{ background: bgColor}}>
        <p className={style.heroInfoItem__title}>{title}</p>
        <div className={style.heroInfoItem__number}>{number}</div>
    </div>
  )
}

export default HeroInfoItem