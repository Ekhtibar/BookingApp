import React, { useState } from 'react';
import { Modal, Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import style from './style.module.css';

const modalStyle = {
    maxWidth: '650px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '85%',
    maxHeight: '80vh', 
    bgcolor: '#252525',
    borderRadius: '20px',
    boxShadow: 24,
    p: 2,
};

const contentStyle = {
    maxHeight: '70vh', 
};

const CreateNewRoomModal = ({ open, onClose, onInputChange, bookingData, errors, handleSave }) => {
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            onInputChange('img', file);
            setImageUrl(''); // Очистить URL, если загружено изображение
        }
    };

    const handleImageUrlChange = (e) => {
        const url = e.target.value;
        setImageUrl(url);
        onInputChange('img', url); // Обновить состояние с URL
        setImage(null); // Очистить предварительный просмотр изображения, если указан URL
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
                    Создать новую комнату
                </Typography>
                <div style={contentStyle}>
                    <div className={style.modalInner__wrapper}>
                        <div className={style.leftSide}>
                            <div className={style.modalInner_leftSide}>
                                <input
                                    type="text"
                                    placeholder="Название номера"
                                    value={bookingData.name || ''} // Убедитесь, что значение не undefined
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
                                        value={bookingData.category || ''} // Убедитесь, что значение не undefined
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
                                    value={bookingData.description || ''} // Убедитесь, что значение не undefined
                                    onChange={(e) => onInputChange('description', e.target.value)}
                                    style={{ width: '100%', margin: '10px 0' }}
                                    className={style.textField}
                                />
                                {errors.description && <div className={style.errors}>{errors.description}</div>}

                                <div className={style.baloncyWrapper}>
                                    <input
                                        type="checkbox"
                                        checked={bookingData.balcony || false} // Убедитесь, что значение не undefined
                                        onChange={(e) => onInputChange('balcony', e.target.checked)}
                                    />
                                    <label style={{ color: '#fff' }}>Есть балкон</label> <br />
                                </div>

                                <label className={style.labels}>Вместимость гостей</label>
                                <input
                                    type="number"
                                    placeholder="Введите вместимость гостей"
                                    value={bookingData.capacity || 0} // Убедитесь, что значение не undefined
                                    onChange={(e) => onInputChange('capacity', e.target.value)}
                                    style={{ width: '100%', margin: '10px 0' }}
                                    className={style.textField}
                                />
                                {errors.capacity && <div className={style.errors}>{errors.capacity}</div>}
                            </div>

                            <div className={style.modalInner_rightSide} style={{ width: '250px' }}>
                                <label className={style.labels}>Количество спален</label>
                                <input
                                    type="number"
                                    placeholder="Введите количество спален"
                                    value={bookingData.bedrooms || 1} // Убедитесь, что значение не undefined
                                    onChange={(e) => onInputChange('bedrooms', e.target.value)}
                                    style={{ width: '100%', margin: '10px 0' }}
                                    className={style.textField}
                                />
                                {errors.bedrooms && <div className={style.errors}>{errors.bedrooms}</div>}

                                <label className={style.labels}>Стоимость за ночь</label>
                                <input
                                    type="number"
                                    placeholder="Цена за ночь"
                                    value={bookingData.pricePerNight || 0} // Убедитесь, что значение не undefined
                                    onChange={(e) => onInputChange('pricePerNight', e.target.value)}
                                    style={{ width: '100%', margin: '10px 0' }}
                                    className={style.textField}
                                />
                                {errors.pricePerNight && <div className={style.errors}>{errors.pricePerNight}</div>}

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ margin: '10px 0' }}
                                />
                                <input
                                    type="text"
                                    placeholder="Введите URL изображения (например, .webp)"
                                    value={imageUrl || ''} // Убедитесь, что значение не undefined
                                    onChange={handleImageUrlChange}
                                    style={{ width: '100%', margin: '10px 0' }}
                                    className={style.textField}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.modalBtns}>
                    <button className={style.closeModalBtn} onClick={onClose}>Отменить</button>
                    <button className={style.bookBtn} onClick={handleSave}>Создать</button>
                </div>
            </Box>
        </Modal>
    );
};

export default CreateNewRoomModal;