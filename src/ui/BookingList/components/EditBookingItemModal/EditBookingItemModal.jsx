import React from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs'; // Импорт dayjs
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
    overflow: 'scroll'
};

const EditBookingItemModal = ({ open, onClose, bookingData, onInputChange, onSave, errors }) => {
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
                    Редактировать бронирование
                </Typography>
                <div className={style.modalInner__wrapper}>
                    <div className={style.leftSide}>
                        <input
                            type="text"
                            placeholder="Имя"
                            value={bookingData.firstname}
                            onChange={(e) => onInputChange('firstname', e.target.value)}
                            style={{ width: '100%', margin: '10px 0' }}
                            className={style.textField}
                        />
                        {errors.firstname && <div className={style.errors}>{errors.firstname}</div>}
                        <input
                            type="text"
                            placeholder="Фамилия"
                            value={bookingData.lastname}
                            onChange={(e) => onInputChange('lastname', e.target.value)}
                            style={{ width: '100%', margin: '10px 0' }}
                            className={style.textField}
                        />
                        {errors.lastname && <div className={style.errors}>{errors.lastname}</div>}
                        <input
                            type="text"
                            placeholder="Отчество"
                            value={bookingData.surename}
                            onChange={(e) => onInputChange('surename', e.target.value)}
                            style={{ width: '100%', margin: '10px 0' }}
                            className={style.textField}
                        />
                        {errors.surename && <div className={style.errors}>{errors.surename}</div>}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <div style={{ marginTop: '35px', display: 'flex', gap: '10px', color: '#fff' }}>
                                <DatePicker
                                    label="Дата заезда"
                                    value={bookingData.check_in ? dayjs(bookingData.check_in) : null} // Преобразование в dayjs
                                    sx={{
                                        '& .MuiInputLabel-root': {
                                            color: '#fff'
                                        },
                                    }}
                                    format="DD.MM.YYYY"
                                    onChange={(newValue) => onInputChange('check_in', newValue)}
                                    renderInput={(params) => <input {...params} style={{ width: '100%', margin: '10px 0' }} />}
                                />
                                <DatePicker
                                    label="Дата выезда"
                                    value={bookingData.check_out ? dayjs(bookingData.check_out) : null} // Преобразование в dayjs
                                    sx={{
                                        '& .MuiInputLabel-root': {
                                            color: '#fff'
                                        },
                                    }}
                                    className="customDatePicker"
                                    format="DD.MM.YYYY"
                                    onChange={(newValue) => onInputChange('check_out', newValue)}
                                    renderInput={(params) => <input className={style.textField} {...params} />}
                                />
                            </div>
                        </LocalizationProvider>
                    </div>
                </div>
                <div className={style.modalBtns}>
                    <button className={style.closeModalBtn} onClick={onClose}>Отменить</button>
                    <button className={style.saveBtn} onClick={onSave}>Сохранить</button>
                </div>
            </Box>
        </Modal>
    );
};

export default EditBookingItemModal;