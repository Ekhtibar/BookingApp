import { Controller, Get, Post, Body, Param, Patch, Delete, NotFoundException } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingEntity } from './entity/booking.entity';
import { CreateBookingDto } from './dtos/createBooking.dto';
import { UpdateBookingDto } from './dtos/updateBooking.dto';

@Controller('bookings')
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) {}

    @Get()
    async findAll(): Promise<BookingEntity[]> {
        return this.bookingsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<BookingEntity> {
        const booking = await this.bookingsService.findOne(id);
        if (!booking) {
            throw new NotFoundException(`Бронирование с ID ${id} не найдено`);
        }
        return booking;
    }

    @Post()
    async create(@Body() createBookingDto: CreateBookingDto): Promise<BookingEntity> {
        // console.log('Request Body:', createBookingDto);
        return this.bookingsService.create(createBookingDto);
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() updateBookingDto: UpdateBookingDto): Promise<void> {
        const booking = await this.bookingsService.findOne(id);
        if (!booking) {
            throw new NotFoundException(`Бронирование с ID ${id} не найдено`);
        }
        await this.bookingsService.update(id, updateBookingDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        const booking = await this.bookingsService.findOne(id);
        if (!booking) {
            throw new NotFoundException(`Бронирование с ID ${id} не найдено`);
        }
        await this.bookingsService.remove(id);
    }
}