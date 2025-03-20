import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from './entity/Room.entity';
import { Between, In, LessThan, LessThanOrEqual, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { CreateRoomDto } from './dtos/createRoom.dto';
import { BookingEntity } from 'src/bookings/entity/booking.entity';
import { VisitorEntity } from 'src/visitors/entity/visitor.entity';
import { RoomStatus } from './enum/room-status.enum';

@Injectable()
export class RoomsService {
    constructor(
        @InjectRepository(RoomEntity) private roomsRepository: Repository<RoomEntity>,
        @InjectRepository(BookingEntity) private bookingsRepository: Repository<BookingEntity>,
        @InjectRepository(VisitorEntity) private visitorsRepository: Repository<VisitorEntity>

    ) { }

    async getAllRooms(): Promise<RoomEntity[]> {
        return await this.roomsRepository.find();
    }

    async getRoomById(id: number): Promise<RoomEntity | null> {
        return await this.roomsRepository.findOne({ where: { id: id } })
    }

    async getRoomsByCategory(category: string): Promise<RoomEntity[]> {
        return await this.roomsRepository.find({ where: { category: category } })
    }

    async createRoom(room: CreateRoomDto): Promise<RoomEntity> {
        const newRoom = this.roomsRepository.create(room); 
        return await this.roomsRepository.save(newRoom);
    }

    async getRoomsByBalcony(hasBalcony: boolean): Promise<RoomEntity[]> {
        return await this.roomsRepository.find({ where: { balcony: hasBalcony } })
    }

    async getRoomsByPriceRange(minPrice: number, maxPrice: number): Promise<RoomEntity[]> {
        return await this.roomsRepository.find({
            where: {
                pricePerNight: Between(minPrice, maxPrice),
            }
        });
    }

    async getRoomsByBedrooms(numBedrooms: number): Promise<RoomEntity[]> {
        return await this.roomsRepository.find({ where: { bedrooms: numBedrooms } })
    }

    async updateRoom(id: number, room: CreateRoomDto): Promise<RoomEntity | null> {
        const existingRoom = await this.getRoomById(id);
        if (!existingRoom) {
            return null;
        }

        return await this.roomsRepository.save({ ...existingRoom, ...room });
    }

    async deleteRoom(id: number): Promise<void> {
        await this.roomsRepository.delete({ id: id });
    }

    async getAvailableRoomsByDate(check_in: Date, check_out: Date): Promise<RoomEntity[]> {
        const bookings = await this.bookingsRepository.find({
            where: [
                { check_out: MoreThanOrEqual(check_in), check_in: LessThan(check_out) },
            ],
        });

        const bookedRoomIds = bookings.map(booking => booking.room.id);

        return await this.roomsRepository.find({
            where: {
                id: Not(In(bookedRoomIds)),
            },
        });
    }

    async getAvailableRooms(): Promise<RoomEntity[]> {
        return await this.roomsRepository.find({
            where: { status: RoomStatus.AVAILABLE },
        });
    }

    async getNumberOfAvailableRooms(check_in: Date, check_out: Date): Promise<number> {
        const availableRooms = await this.getAvailableRoomsByDate(check_in, check_out);
        return availableRooms.length;
    }

    async getRoomsInCleaning(): Promise<RoomEntity[]> {
        return await this.roomsRepository.find({
            where: { status: RoomStatus.CLEANING },
        });
    }

    async getBookedRooms(): Promise<RoomEntity[]> {
        return await this.roomsRepository.find({
            where: { status: RoomStatus.BOOKED },
        });
    }

    async bookRoom(room: RoomEntity, visitors: VisitorEntity[], check_in: Date, check_out: Date): Promise<BookingEntity> {
        room.status = RoomStatus.BOOKED;
        await this.roomsRepository.save(room);
    
        const booking = new BookingEntity();
        booking.room = room;
        booking.visitors = visitors;
        booking.check_in = check_in;
        booking.check_out = check_out;
        booking.status = 'active';
        return await this.bookingsRepository.save(booking);
    }
}
