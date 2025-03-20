import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import style from './style.module.css';

const modalStyle = {
    maxWidth: '650px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '85%',
    minHeight: '420px',
    maxHeight: '500px',
    bgcolor: '#252525',
    borderRadius: '20px',
    boxShadow: 24,
    p: 2,
};

const UpdateRoomModal = ({ open, onClose, onInputChange, bookingData, errors, handleSave }) => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (bookingData && bookingData.imageUrl) {
            setImage(bookingData.imageUrl);
        }
    }, [bookingData]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            onInputChange('imageUrl', file); // Assuming you want to handle the image file
        }
    };

    return (
        <Modal
            keepMounted
            open={open}
            onClose={onClose}
            aria-labelledby="update-room-modal-title"
            aria-describedby="update-room-modal-description"
        >
            <Box sx={modalStyle}>
                <Typography id="update-room-modal-title" variant="h6" component="h2" style={{ fontWeight: 400, fontSize: '18px', marginBottom: '20px', color: '#fff' }}>
                    Редактировать номер
                </Typography>
                <div className={style.modalInner__wrapper}>
                    <div className={style.leftSide}>
                        <div className={style.modalInner_leftSide}>
                            <input
                                type="text"
                                placeholder="Название номера"
                                value={bookingData.name}
                                onChange={(e) => onInputChange('name', e.target.value)}
                                style={{ width: '100%', margin: '10px 0' }}
                                className={style.textField}
                            />
                            {errors.name && <div className={style.errors}>{errors.name}</div>}

                            <FormControl fullWidth style={{ margin: '10px 0' }}>
                                <InputLabel id="category-select-label" style={{ color: '#4EA8DE', fontWeight: '500', fontSize: '16px' }}>Категория номера</InputLabel>
                                <Select
                                    labelId="category-select-label"
                                    id="category-select"
                                    value={bookingData.category}
                                    onChange={(e) => onInputChange('category', e.target.value)}
                                    label="Категория номера"
                                    style={{ backgroundColor: '#333', color: 'white' }}
                                >
                                    <MenuItem value="Стандарт">Стандарт</MenuItem>
                                    <MenuItem value="Премиум">Премиум</MenuItem>
                                    <MenuItem value="Люкс">Люкс</MenuItem>
                                </Select>
                            </FormControl>
                            {errors.category && <div className={style.errors}>{errors.category}</div>}

                            <input
                                type="text"
                                placeholder="Описание"
                                value={bookingData.description}
                                onChange={(e) => onInputChange('description', e.target.value)}
                                style={{ width: '100%', margin: '10px 0' }}
                                className={style.textField}
                            />
                            {errors.description && <div className={style.errors}>{errors.description}</div>}

                            <div className={style.baloncyWrapper}>
                                <input
                                    type="checkbox"
                                    checked={bookingData.balcony}
                                    onChange={(e) => onInputChange('balcony', e.target.checked)}
                                />
                                <label style={{ color: '#fff' }}>Есть балкон</label> <br />
                            </div>
                        </div>

                        <div className={style.modalInner_rightSide} style={{ width: '250px' }}>
                            <label className={style.labels}>Количество спален</label>
                            <input
                                type="number"
                                placeholder="Введите количество спален"
                                value={bookingData.bedrooms}
                                onChange={(e) => onInputChange('bedrooms', e.target.value)}
                                style={{ width: '100%', margin: '10px 0' }}
                                className={style.textField}
                            />
                            {errors.bedrooms && <div className={style.errors}>{errors.bedrooms}</div>}

                            <label className={style.labels}>Стоимость за ночь</label>
                            <input
                                type="number"
                                placeholder="Цена за ночь"
                                value={bookingData.pricePerNight}
                                onChange={(e) => onInputChange('pricePerNight', e.target.value)}
                                style={{ width: '100%', margin: '10px 0' }}
                                className={style.textField}
                            />
                            {errors.pricePerNight && <div className={style.errors}>{errors.pricePerNight}</div>}

                            <FormControl fullWidth style={{ margin: '10px 0' }}>
                                <InputLabel id="status-select-label" style={{ color: '#4EA8DE', fontWeight: '500', fontSize: '16px' }}>Статус номера</InputLabel>
                                <Select
                                    labelId="status-select-label"
                                    id="status-select"
                                    value={bookingData.status}
                                    onChange={(e) => onInputChange('status', e.target.value)}
                                    label="Статус номера"
                                    style={{ backgroundColor: '#333', color: 'white' }}
                                >
                                    <MenuItem value="свободен">Свободен</MenuItem>
                                    <MenuItem value="забронирован">Забронирован</MenuItem>
                                    <MenuItem value="на уборке">На уборке</MenuItem>
                                </Select>
                            </FormControl>
                            {errors.status && <div className={style.errors}>{errors.status}</div>}

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{ margin: '10px 0' }}
                            />
                        </div>
                    </div>
                </div>
                <div className={style.modalBtns}>
                    <button className={style.closeModalBtn} onClick={onClose}>Отменить</button>
                    <button className={style.bookBtn} onClick={handleSave}>Сохранить</button>
                </div>
            </Box>
        </Modal>
    );
};

export default UpdateRoomModal;