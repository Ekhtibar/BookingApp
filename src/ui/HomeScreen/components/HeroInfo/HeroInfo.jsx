import React, { useEffect } from 'react'
import style from './heroInfo.style.module.css'
import HeroInfoItem from '../HeroInfoItem/HeroInfoItem'


const HeroInfo = () => {
  const [countOfAvavilableRooms, setCountOfAvailableRooms] = React.useState(0);
  const [countOfBookedRooms, setCountOfBookedRooms] = React.useState(0);
  const [countOfCleaningRooms, setCountOfCleaningRooms] = React.useState(0);

  useEffect(() => {
    fetchCountOfAvavilableRooms();
    fetchCountOfRoomsInCleaning();
    fetchCountOfBookedRooms();
  }, [])

  const fetchCountOfAvavilableRooms = async () => {
    const response = await fetch('http://localhost:3001/rooms/available/moment');
    const data = await response.json();
    console.log(data);
    setCountOfAvailableRooms(data.length);
  }

  const fetchCountOfRoomsInCleaning = async () => {
    const response = await fetch('http://localhost:3001/rooms/cleaning/moment');
    const data = await response.json();
    console.log(data);
    setCountOfCleaningRooms(data.length);
  }

  const fetchCountOfBookedRooms = async () => {
    const response = await fetch('http://localhost:3001/bookings');
    const data = await response.json();
    console.log(data);
    setCountOfBookedRooms(data.length);
  }

  return (
    <div className={style.heroInfo}>
        <HeroInfoItem title={'Забронировано'} number={countOfBookedRooms} bgColor={'#4EA8DE'}/>
        <HeroInfoItem title={'Доступно'} number={countOfAvavilableRooms} bgColor={'#8284FA'}/>
        <HeroInfoItem title={'На уброке'} number={countOfCleaningRooms} bgColor={'#5E60CE'}/>
    </div>
  )
}

export default HeroInfo