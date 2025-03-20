import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingEntity } from './entity/booking.entity';
import { LessThan, MoreThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookingDto } from './dtos/createBooking.dto';
import { UpdateBookingDto } from './dtos/updateBooking.dto';
import { CreateVisitorDto } from 'src/visitors/dtos/createVisitor.dto';
import { VisitorEntity } from 'src/visitors/entity/visitor.entity';
import { RoomEntity } from 'src/rooms/entity/Room.entity';
import { RoomStatus } from 'src/rooms/enum/room-status.enum';

@Injectable()
export class BookingsService {
    constructor(
        @InjectRepository(BookingEntity) private bookingsRepository: Repository<BookingEntity>,
        @InjectRepository(VisitorEntity) private visitorsRepository: Repository<VisitorEntity>,
        @InjectRepository(RoomEntity) private roomsRepository: Repository<RoomEntity>
    ) { }

    async findAll(): Promise<BookingEntity[]> {
        return await this.bookingsRepository
            .createQueryBuilder('booking')
            .leftJoinAndSelect('booking.visitors', 'visitor') // Изменено на visitors
            .leftJoinAndSelect('booking.room', 'room')
            .getMany();
    }

    async findOne(id: number): Promise<BookingEntity | null> {
        return await this.bookingsRepository.findOne({ where: { id: id } });
    }

    async create(bookingDto: CreateBookingDto): Promise<BookingEntity> {
        const visitorsData: CreateVisitorDto[] = bookingDto.visitors; // Убедитесь, что это массив
    
        // Находим или создаем посетителей
        const visitors: VisitorEntity[] = [];
        for (const visitorData of visitorsData) {
            let visitor = await this.visitorsRepository.findOne({ where: { firstname: visitorData.firstname, lastname: visitorData.lastname } });
    
            if (!visitor) {
                visitor = this.visitorsRepository.create(visitorData);
                await this.visitorsRepository.save(visitor);
            }
            visitors.push(visitor); // Добавляем найденного или созданного посетителя в массив
        }
    
        // Находим комнату по roomId
        const room = await this.roomsRepository.findOne({ where: { id: bookingDto.roomId } });
        if (!room) {
            throw new NotFoundException(`Комната с ID ${bookingDto.roomId} не найдена`);
        }
    
        // Создаем бронирование
        const booking = this.bookingsRepository.create({
            ...bookingDto,
            visitors: visitors, // Устанавливаем связь с посетителями
            room: room, // Устанавливаем связь с комнатой
        });
    
        return await this.bookingsRepository.save(booking); // Возвращаем созданное бронирование
    }

    async update(id: number, booking: UpdateBookingDto): Promise<void> {
        await this.bookingsRepository.update({ id: id }, booking);
    }

    async remove(id: number): Promise<void> {
        const booking = await this.bookingsRepository.findOne({ where: { id: id }, relations: ['room'] });
        
        if (!booking) {
            throw new NotFoundException(`Бронирование с ID ${id} не найдено`);
        }

        const room = booking.room;
    
        room.status = RoomStatus.AVAILABLE;
        await this.roomsRepository.save(room); 
    
        await this.bookingsRepository.delete({ id: id });
    }

    async checkAvailability(check_in: Date, check_out: Date, roomId: number): Promise<boolean> {
        const bookings = await this.bookingsRepository.find({
            where: {
                room: { id: roomId }, 
                check_out: MoreThanOrEqual(check_in),
                check_in: LessThan(check_out),
            },
        });
        return bookings.length === 0; // Если нет пересечений, комната доступна
    }

    async getNumberOfBookings(): Promise<number> {
        return await this.bookingsRepository.count();
    }

}
