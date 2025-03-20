import React, { useEffect, useState } from 'react';
import style from './style.module.css';
import EditBookingItemModal from './components/EditBookingItemModal/EditBookingItemModal';
import { Player } from '@lottiefiles/react-lottie-player';
import fetchErrorAnimationData from '../../assets/animations/Animation - 1741009104362.json';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookingData, setBookingData] = useState({
    firstname: '',
    lastname: '',
    surename: '',
    check_in: '',
    check_out: '',
  });
  const [errors, setErrors] = useState({});
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // Состояние для диалогового окна удаления
  const [bookingToDelete, setBookingToDelete] = useState(null); // ID бронирования для удаления

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:3001/bookings');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setBookings(data);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBooking = async () => {
    try {
      await fetch(`http://localhost:3001/bookings/${bookingToDelete}`, {
        method: 'DELETE',
      });
      console.log(`Бронирование с id ${bookingToDelete} удалено.`);
      setBookings(bookings.filter((booking) => booking.id !== bookingToDelete));
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error('Ошибка при удалении бронирования:', error);
    }
  };

  const handleOpenDeleteDialog = (bookingId) => {
    setBookingToDelete(bookingId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setBookingToDelete(null);
  };

  const handleOpenEditModal = (booking) => {
    setSelectedBooking(booking);
    setBookingData({
      firstname: booking.visitor.firstname,
      lastname: booking.visitor.lastname,
      surename: booking.visitor.surname,
      check_in: booking.check_in,
      check_out: booking.check_out,
    });
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedBooking(null);
  };

  const handleInputChange = (field, value) => {
    setBookingData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    const updatedBooking = {
      ...selectedBooking,
      visitor: {
        firstname: bookingData.firstname,
        lastname: bookingData.lastname,
        surname: bookingData.surename,
      },
      check_in: bookingData.check_in,
      check_out: bookingData.check_out,
    };

    try {
      const response = await fetch(`http://localhost:3001/bookings/${selectedBooking.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBooking),
      });

      if (response.ok) {
        console.log('Бронирование успешно обновлено');
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === selectedBooking.id ? updatedBooking : booking
          )
        );
        handleCloseEditModal();
      } else {
        console.error('Ошибка при обновлении бронирования:', response.statusText);
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
  };

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return (
      <div className={style.bookingListErrorComponent}>
        <Player
          autoplay
          loop
          src={fetchErrorAnimationData}
          style={{ width: '300px', height: '230px' }}
        />
        <p className={style.bookingListErrorComponent__txt}>Ошибка: {error}</p>
      </div>
    );
  }

  return (
    <div className={style.container}>
      {bookings.length > 0 ? (
        <div className={style.bookings}>
          {bookings.map((booking) => (
            <div key={booking.id} className={style.bookingItem}>
              <div className={`${style.col} ${style.bookingItem__imgWrapper}`}>
                <img src="" alt="img" className={style.bookingItem__img} />
              </div>
              <div className={`${style.col} ${style.bookingItem__info}`}>
                <p className={style.bookingItem__title}>
                  {booking.room.name} <span className={style.bookingItem__category}>{booking.room.category}</span>
                </p>
                <div className={style.bookingItem__check_in}>Дата заезда: {new Date(booking.check_in).toLocaleString()}</div>
                <div className={style.bookingItem__check_out}>Дата выезда: {new Date(booking.check_out).toLocaleString()}</div>
                <div className={style.bookingItem__clientFullName}>
                  ФИО клиентов: {booking.visitors.map(visitor => (
                    <span key={visitor.id}>
                      {visitor.firstname} {visitor.lastname} {visitor.surname}, <br />
                    </span>
                  ))}
                </div>
              </div>
              <div className={`${style.col} ${style.bookingItem__btns}`}>
                <button className={style.bookingItem__delBtn} onClick={() => handleOpenDeleteDialog(booking.id)}>Удалить</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Список бронирований пуст.</p>
      )}
      <EditBookingItemModal
        open={openEditModal}
        onClose={handleCloseEditModal}
        bookingData={bookingData}
        onInputChange={handleInputChange}
        onSave={handleSave}
        errors={errors}
      />
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Подтверждение удаления</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить это бронирование?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Отмена
          </Button>
          <Button onClick={handleDeleteBooking} color="secondary">
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BookingList;