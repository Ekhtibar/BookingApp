import React from 'react';
import style from './roomCardItem.style.module.css';

const RoomCardItem = ({ img, title, category, status, description, moreInfo, price, onBook }) => {
  return (
    <div className={style.roomCardItem}>
      <div className={style.roomCardItem__top}>
        <img src={img} alt={title} className={style.roomCardItem__top__img} />
        <div className={style.roomCardItem__top__info}>
          <div className={style.roomCardItem__top__info__title_category}>
            <p className={style.roomCardItem__top__info__title}>{title}</p>
            <span className={style.roomCardItem__top__info__category}>{category}</span>
          </div>
          <p className={style.roomCardItem__top__info__description}>
            {description}
          </p>
          <div className={style.roomCardItem__top__info__moreInfo}>
            {moreInfo.map((info, index) => (
              <div key={index} className={style.roomCardItem__top__info__moreInfo__item}>
                {info}
              </div>
            ))}
          </div>
        </div>

      </div>
      <div className={style.roomCardItem__price}>{price} руб. за сутки</div>
      <button className={style.roomCardItem__bookingBtn} onClick={onBook}>Забронировать</button>
    </div>
  );
};

export default RoomCardItem;