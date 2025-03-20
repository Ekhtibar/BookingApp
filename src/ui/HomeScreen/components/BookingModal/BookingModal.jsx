import React, { useState } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import style from './style.module.css';

const modalStyle = {
    maxWidth: '650px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '85%',
    minHeight: '530px',
    maxHeight: '500px',
    bgcolor: '#252525',
    borderRadius: '20px',
    boxShadow: 24,
    p: 2,
};

function BookingModal({ onSave, onClose, open, bookingData, onInputChange, selectedRoom }) {
    const [checkInDate, setCheckInDate] = useState(dayjs());
    const [checkOutDate, setCheckOutDate] = useState(dayjs());
    const [visitors, setVisitors] = useState([{ firstname: '', lastname: '', surname: '' }]); // Изменено с surename на surname
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        
        visitors.forEach((visitor, index) => {
            if (!visitor.firstname || !/^[A-ZА-ЯЁ][a-zа-яё]+$/.test(visitor.firstname)) {
                newErrors[`firstname_${index}`] = 'Имя должно начинаться с заглавной буквы и не быть пустым';
            }
            if (!visitor.lastname || !/^[A-ZА-ЯЁ][a-zа-яё]+$/.test(visitor.lastname)) {
                newErrors[`lastname_${index}`] = 'Фамилия должна начинаться с заглавной буквы и не быть пустой';
            }
            if (!visitor.surname || !/^[A-ZА-ЯЁ][a-zа-яё]*(?:\s[A-ZА-ЯЁ][a-zа-яё]+)*$/.test(visitor.surname)) { // Изменено с surename на surname
                newErrors[`surname_${index}`] = 'Отчество должно начинаться с заглавной буквы и может содержать пробелы'; // Изменено с surename на surname
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validate()) {
            onSave({ 
                visitors, 
                check_in: checkInDate, 
                check_out: checkOutDate 
            });
        }
    };

    const addVisitor = () => {
        if (visitors.length < selectedRoom.capacity) {
            setVisitors([...visitors, { firstname: '', lastname: '', surname: '' }]);
        } else {
            alert('Достигнуто максимальное количество гостей для этого номера.');
        }
    };

    const handleVisitorChange = (index, field, value) => {
        const newVisitors = [...visitors];
        newVisitors[index][field] = value;
        setVisitors(newVisitors);
    };

    return (
        <Modal
            keepMounted
            open={open}
            onClose={onClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={modalStyle}>
                <Typography id="keep-mounted-modal-title" variant="h6" component="h2" style={{ fontWeight: 400, fontSize: '18px', marginBottom: '20px', color: '#fff' }}>
                    Забронировать комнату
                </Typography>
                <div className={style.modalInner__wrapper}>
                    <div className={style.leftSide}>
                        {visitors.map((visitor, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    placeholder="Имя"
                                    value={visitor.firstname}
                                    onChange={(e) => handleVisitorChange(index, 'firstname', e.target.value)}
                                    style={{ width: '100%', margin: '10px 0' }}
                                    className={style.textField}
                                />
                                {errors[`firstname_${index}`] && <div className={style.errors}>{errors[`firstname_${index}`]}</div>}
                                <input
                                    type="text"
                                    placeholder="Фамилия"
                                    value={visitor.lastname}
                                    onChange={(e) => handleVisitorChange(index, 'lastname', e.target.value)}
                                    style={{ width: '100%', margin: '10px 0' }}
                                    className={style.textField}
                                />
                                {errors[`lastname_${index}`] && <div className={style.errors}>{errors[`lastname_${index}`]}</div>}
                                <input
                                    type="text"
                                    placeholder="Отчество"
                                    value={visitor.surname} // Изменено с surename на surname
                                    onChange={(e) => handleVisitorChange(index, 'surname', e.target.value)} // Изменено с surename на surname
                                    style={{ width: '100%', margin: '10px 0' }}
                                    className={style.textField}
                                />
                                {errors[`surname_${index}`] && <div className={style.errors}>{errors[`surname_${index}`]}</div>} // Изменено с surename на surname
                            </div>
                        ))}
                        <button onClick={addVisitor} style={{ margin: '10px 0' }}>Добавить пользователя</button>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <div style={{ marginTop: '35px', display: 'flex', gap: '10px', color: '#fff' }}>
                                <DatePicker
                                    label="Дата заезда"
                                    value={checkInDate}
                                    sx={{
                                        '& .MuiInputLabel-root': {
                                            color: '#fff'
                                        },
                                    }}
                                    format="DD.MM.YYYY"
                                    onChange={(newValue) => setCheckInDate(newValue)}
                                    renderInput={(params) => <input {...params} style={{ width: '100%', margin: '10px 0' }} />}
                                />
                                <DatePicker
                                    label="Дата выезда"
                                    value={checkOutDate}
                                    sx={{
                                        '& .MuiInputLabel-root': {
                                            color: '#fff'
                                        },
                                    }}
                                    className="customDatePicker"
                                    format="DD.MM.YYYY"
                                    onChange={(newValue) => setCheckOutDate(newValue)}
                                    renderInput={(params) => <input className={style.textField} {...params} />}
                                />
                            </div>
                        </LocalizationProvider>
                    </div>
                    <div className={style.rightSide}>
                        <div className={style.bookingInfo}>
                            <div className={style.title}>Цена: {selectedRoom?.pricePerNight} руб. за сутки</div>
                            <p className={style.description}>{selectedRoom?.description}</p>

                            <div className={style.bookingInfo__detail}>
                                <span className={style.rooms}>Спален: {selectedRoom?.bedrooms}</span>
                                <span className={style.baloncy}>Балкон: {selectedRoom?.balcony ? 'Есть' : 'Нет'}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.modalBtns}>
                    <button className={style.closeModalBtn} onClick={onClose}>Отменить</button>
                    <button className={style.bookBtn} onClick={handleSave}>Забронировать</button>
                </div>
            </Box>
        </Modal>
    );
}

export default BookingModal;