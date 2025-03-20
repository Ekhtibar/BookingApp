import React, { useEffect, useState } from 'react';
import style from './style.module.css';
import HeroInfo from './components/HeroInfo/HeroInfo';
import RoomCardItem from './components/RoomCardItem/RoomCardItem';
import { useDispatch, useSelector } from 'react-redux';
import { setRooms } from '../../redux/slices/roomsSlice';
import BookingModal from './components/BookingModal/BookingModal';
import CreateNewRoomModal from './components/CreateNewRoomModal/CreateNewRoomModal';
import { Player } from '@lottiefiles/react-lottie-player';
import roomsNotFounAnimationData from '../../assets/animations/Animation - 1740929808818.json';
import fetchErrorAnimationData from '../../assets/animations/Animation - 1741009104362.json';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slider from '@mui/material/Slider';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const HomeScreen = () => {
  const [openBookingModal, setOpenBookingModal] = useState(false);
  const [openCreateRoomModal, setOpenCreateRoomModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    firstname: '',
    lastname: '',
    surname: '', // Изменено с surename на surname
    check_in: '',
    check_out: '',
    capacity: '',
    roomId: null
  });
  const [roomData, setRoomData] = useState({
    name: '',
    category: '',
    description: '',
    balcony: false,
    bedrooms: 1,
    pricePerNight: 0,
    img: null
  });
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const dispatch = useDispatch();
  const availableRooms = useSelector((state) => state.rooms.availableRooms);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/rooms/available/moment');
      if (!response.ok) {
        throw new Error('Ошибка при получении данных');
      }
      const data = await response.json();
      dispatch(setRooms(data));
      setError(null);
    } catch (error) {
      setError('Ошибка при выполнении запроса');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const handleOpenBookingModal = (room) => {
    setSelectedRoom(room);
    setOpenBookingModal(true);
  };
  const handleCloseBookingModal = () => setOpenBookingModal(false);

  const handleOpenCreateRoomModal = () => {
    setOpenCreateRoomModal(true);
  };
  const handleCloseCreateRoomModal = () => {
    setOpenCreateRoomModal(false);
    setRoomData({
      name: '',
      category: '',
      description: '',
      balcony: false,
      bedrooms: 1,
      pricePerNight: 0,
      img: null
    });
  };

  const handleInputChange = (field, value) => {
    setBookingData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleRoomInputChange = (field, value) => {
    setRoomData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleCreateBooking = async (data) => {
    const bookingPayload = {
      visitors: data.visitors.map(visitor => ({
          firstname: visitor.firstname,
          lastname: visitor.lastname,
          surname: visitor.surname, // Изменено с surename на surname
      })),
      roomId: selectedRoom.id,
      check_in: data.check_in.toISOString(),
      check_out: data.check_out.toISOString(),
      status: "active"
  };

  console.log('Бронирование создается:', bookingPayload);

    try {
      const response = await fetch('http://localhost:3001/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingPayload),
      });

      if (response.ok) {
        console.log('Бронирование успешно создано');
        setBookingData({
          firstname: '',
          lastname: '',
          surname: '', // Изменено с surename на surname
          check_in: '',
          check_out: '',
          roomId: null
        });
        fetchData();
      } else {
        console.error('Ошибка при создании бронирования:', response.statusText);
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }

    setOpenBookingModal(false);
  };

  const handleCreateRoom = async () => {
    const roomPayload = {
      name: roomData.name,
      category: roomData.category,
      description: roomData.description,
      balcony: roomData.balcony,
      bedrooms: roomData.bedrooms,
      pricePerNight: roomData.pricePerNight,
      capacity: roomData.capacity,
      img: roomData.img
    };

    try {
      const response = await fetch('http://localhost:3001/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomPayload),
      });

      if (response.ok) {
        console.log('Комната успешно создана');
        setSnackbarMessage('Комната успешно создана!');
        setSnackbarOpen(true);
        fetchData();
        handleCloseCreateRoomModal();
      } else {
        console.error('Ошибка при создании комнаты:', response.statusText);
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
  };

  const filteredRooms = availableRooms.filter(room => {
    const isInCategory = selectedCategory === 'Все' || room.category === selectedCategory;
    const isInPriceRange = room.pricePerNight >= priceRange[0] && room.pricePerNight <= priceRange[1];
    return isInCategory && isInPriceRange;
  });

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <div className={style.homeScreen}>
      <HeroInfo />
      <div className={style.homeTopbar}>
        <p className={style.homeTopBar__available_title}>Доступные для бронирования</p>
        <div className={style.homeTopbar__item} onClick={() => setSelectedCategory('Все')} style={{ background: selectedCategory === 'Все' ? '#191919' : 'transparent' }}>Все</div>
        <div className={style.homeTopbar__item} onClick={() => setSelectedCategory('Стандарт')} style={{ background: selectedCategory === 'Стандарт' ? '#191919' : 'transparent' }}>Стандарт</div>
        <div className={style.homeTopbar__item} onClick={() => setSelectedCategory('Премиум')} style={{ background: selectedCategory === 'Премиум' ? '#191919' : 'transparent' }}>Премиум</div>
        <div className={style.homeTopbar__item} onClick={() => setSelectedCategory('Люкс')} style={{ background: selectedCategory === 'Люкс' ? '#191919' : 'transparent' }}>Люкс</div>
        <div className={style.priceFilter} style={{ display: 'block', marginLeft: 'auto', marginRight: '0px' }}>
          <p style={{ color: '#fff', marginLeft: '20px', fontSize: '14px' }}>Цена: {priceRange[0]} - {priceRange[1]}</p>
          <Slider
            sx={{
              width: '250px', marginLeft: '20px', '& .MuiSlider-thumb': {
                height: 15, // Уменьшите высоту "thumb" (кнопки)
                width: 15, // Уменьшите ширину "thumb"
              },
              '& .MuiSlider-track': {
                height: 4, // Уменьшите высоту трека
              },
              '& .MuiSlider-rail': {
                height: 4, // Уменьшите высоту рельса
              },
            }}
            componentsProps={{
              valueLabel: {
                sx: {
                  fontSize: '0.65rem', // Уменьшите размер шрифта
                  padding: '4px 8px', // Уменьшите отступы
                  backgroundColor: 'rgba(0, 0, 0, 0.87)', // Цвет фона
                  color: 'white', // Цвет текста
                  borderRadius: '4px', // Закругление углов
                },
              },
            }}
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={10000}
          />
        </div>
        <button className={style.createNewRoomBtn} onClick={handleOpenCreateRoomModal}>Создать новый номер</button>
      </div>

      {error ? (
        <div className={style.bookingListErrorComponent}>
          <Player
            autoplay
            loop
            src={fetchErrorAnimationData}
            style={{ width: '300px', height: '230px' }}
          />
          <p className={style.bookingListErrorComponent__txt}>Ошибка: {error}</p>
        </div>
      ) : filteredRooms && filteredRooms.length > 0 ? (
        <div className={style.available_rooms_grid}>
          {filteredRooms.map((room) => (
            <RoomCardItem
              key={room.id}
              img={room.img || 'default_image_url'}
              title={room.name}
              category={room.category}
              description={room.description}
              moreInfo={[
                `Спален: ${room.bedrooms}`,
                `Балкон: ${room.balcony ? 'Есть' : 'Нет'}`,
              ]}
              price={room.pricePerNight}
              onBook={() => handleOpenBookingModal(room)}
            />
          ))}
        </div>
      ) : (
        <div className={style.roomsNotFount}>
          <Player
            autoplay
            loop
            src={roomsNotFounAnimationData}
            style={{ width: '300px', height: '230px' }}
          />
          <p className={style.allNumsBookedTxt}>
            Все номера забронированы.<br />
            Рекомендуем следить за изменениями в <br />
            Списке бронирований.
          </p>
        </div>
      )}
      <BookingModal
        open={openBookingModal}
        onClose={handleCloseBookingModal}
        onSave={handleCreateBooking}
        bookingData={bookingData}
        onInputChange={handleInputChange}
        selectedRoom={selectedRoom}
      />
      <CreateNewRoomModal
        open={openCreateRoomModal}
        onClose={handleCloseCreateRoomModal}
        onInputChange={handleRoomInputChange}
        bookingData={roomData}
        errors={{}}
        handleSave={handleCreateRoom}
      />

      {/* Snackbar for success message */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default HomeScreen;