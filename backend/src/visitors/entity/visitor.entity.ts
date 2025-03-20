import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { BookingEntity } from 'src/bookings/entity/booking.entity';

@Entity('visitors')
export class VisitorEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    surname: string;

    @ManyToMany(() => BookingEntity, booking => booking.visitors)
    bookings: BookingEntity[];
}