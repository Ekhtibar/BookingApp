import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { VisitorEntity } from 'src/visitors/entity/visitor.entity';
import { RoomEntity } from 'src/rooms/entity/Room.entity';

@Entity('bookings')
export class BookingEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => VisitorEntity, visitor => visitor.bookings)
    @JoinTable() // Создает таблицу для связи многие-ко-многим
    visitors: VisitorEntity[];

    @ManyToOne(() => RoomEntity, room => room.bookings)
    room: RoomEntity;

    @Column()
    check_in: Date;

    @Column()
    check_out: Date;

    @Column()
    status: 'active' | 'canceled' | 'completed';
}