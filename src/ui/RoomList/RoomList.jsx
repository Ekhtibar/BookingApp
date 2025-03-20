import React, { useEffect, useState } from 'react';
import style from './style.module.css';
import UpdateRoomModal from './components/UpdateRoomModal/UpdateRoomModal';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:3001/rooms/');
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchRooms();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/rooms/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setRooms(rooms.filter(room => room.id !== id));
      } else {
        console.error('Ошибка при удалении комнаты');
      }
    } catch (error) {
      console.error('Ошибка при удалении комнаты:', error);
    }
  };

  const handleSave = async (updatedRoom) => {
    try {
      const response = await fetch(`http://localhost:3001/rooms/${updatedRoom.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRoom),
      });
      if (response.ok) {
        const updatedData = await response.json();
        setRooms(rooms.map(room => (room.id === updatedData.id ? updatedData : room)));
        setModalOpen(false);
        setSnackbarMessage('Комната успешно обновлена!');
        setSnackbarOpen(true);
      } else {
        console.error('Ошибка при обновлении комнаты');
      }
    } catch (error) {
      console.error('Ошибка при обновлении комнаты:', error);
    }
  };

  // Вызовите handleEdit с room, который включает статус
  const handleEdit = (room) => {
    setCurrentRoom(room);
    setModalOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className={style.container}>
      <div className={style.roomList}>
        {rooms.map(room => (
          <div key={room.id} className={style.roomListItem}>
            <div className={style.col1}>
              {room.imageUrl && <img src={room.imageUrl} alt={room.name} className={style.roomImage} />}
              <h3 className={style.name}>{room.name}</h3>
              <p style={{ fontSize: '14px', fontWeight: '300', marginTop: '12px' }}>Категория: <span className={style.roomListItem__category}>{room.category}</span></p>
              <p style={{ fontSize: '14px', fontWeight: '300' }}>Описание: {room.description}</p>
              <p style={{ fontSize: '14px', fontWeight: '300' }}>Цена за ночь: {room.pricePerNight} руб.</p>
            </div>
            <div className={style.col2}>
              <button className={style.bookingItem__editBn} onClick={() => handleEdit(room)}>Редактировать</button>
              <button className={style.bookingItem__delBtn} onClick={() => handleDelete(room.id)}>Удалить</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for updating room */}
      {modalOpen && (
        <UpdateRoomModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onInputChange={(field, value) => setCurrentRoom({ ...currentRoom, [field]: value })}
          bookingData={currentRoom}
          errors={errors}
          handleSave={() => handleSave(currentRoom)}
        />
      )}

      {/* Snackbar for success message */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default RoomList;