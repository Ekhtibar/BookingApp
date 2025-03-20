import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BookingEntity } from 'src/bookings/entity/booking.entity';
import { RoomStatus } from '../enum/room-status.enum';

@Entity('rooms')
export class RoomEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: false })
  balcony: boolean;

  @Column()
  bedrooms: number;

  @Column()
  pricePerNight: number;

  @Column()
  capacity: number; // Новое поле для вместимости гостей

  @Column({
    type: 'enum',
    enum: RoomStatus,
    default: RoomStatus.AVAILABLE,
  })
  status: RoomStatus;

  @OneToMany(() => BookingEntity, (booking) => booking.room)
  bookings: BookingEntity[];
}