import React, { useState } from 'react'
import Header from './ui/Header/Header'
import style from './App.style.module.css'
import HomeScreen from './ui/HomeScreen/HomeScreen'
import BookingList from './ui/BookingList/BookingList';
import Notifications from './ui/Notifications/Notifications';
import RoomList from './ui/RoomList/RoomList';


function App({ onCreateRoom }) {
  const [screen, setScreen] = useState('home');

  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return <HomeScreen />;
      case 'bookings':
        return <BookingList />;
      case 'notifications':
        return <Notifications />;
      case 'rooms':
        return <RoomList />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className={style.container}>
      <Header appName={'Моя гостиница'} />
      <div className={style.topBar}>
        <div
          className={style.topBat__item}
          onClick={() => setScreen('home')}
          style={{ background: screen === 'home' ? '#191919' : 'transparent' }}>Главная</div>
        <div
          className={style.topBat__item}
          onClick={() => setScreen('bookings')}
          style={{ background: screen === 'bookings' ? '#191919' : 'transparent' }}>Список бронирований</div>
        <div
          className={style.topBat__item}
          onClick={() => setScreen('rooms')}
          style={{ background: screen === 'rooms' ? '#191919' : 'transparent' }}>Список комнат</div>
        {/* <div 
          className={style.topBat__item} 
          onClick={() => setScreen('notifications')}
          style={{ background: screen === 'notifications' ? '#191919' : 'transparent'}}>
          Уведомления
          <div className={style.puh_num}>10</div>
        </div> */}
        
      </div>
      {renderScreen()}
    </div>
  )
}

export default App