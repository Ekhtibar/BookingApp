import React, { useEffect, useState } from 'react'
import style from './header.style.module.css'
import useCurrentTime from '../../utils/GetCurrentTime'

const Header = ( { appName }) => {
    const currentTime = useCurrentTime()

    return (
        <div className={style.header}>
            <p className={style.header__title}>{appName}</p>
            <div className={style.header__time}>Время: { currentTime }</div>
        </div>
    )
}

export default Header