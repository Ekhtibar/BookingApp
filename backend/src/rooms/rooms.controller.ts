/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Query, BadRequestException, Put, Delete } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomEntity } from './entity/Room.entity';
import { CreateRoomDto } from './dtos/createRoom.dto';

@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) { }

    @Get()
    async getAllRooms(): Promise<RoomEntity[]> {
        console.log('Метод getAllRooms вызван');
        return this.roomsService.getAllRooms();
    }

    @Get(':id')
    async getRoomById(@Param('id') id: number): Promise<RoomEntity | null> {
        return this.roomsService.getRoomById(id);
    }

    @Get('category/:category')
    async getRoomsByCategory(@Param('category') category: string): Promise<RoomEntity[]> {
        return this.roomsService.getRoomsByCategory(category);
    }

    @Post()
    async createRoom(@Body() createRoomDto: CreateRoomDto): Promise<RoomEntity> {
        return this.roomsService.createRoom(createRoomDto);
    }

    @Get('balcony/:hasBalcony')
    async getRoomsByBalcony(@Param('hasBalcony') hasBalcony: boolean): Promise<RoomEntity[]> {
        return this.roomsService.getRoomsByBalcony(hasBalcony);
    }

    @Get('filter/rooms')
    async getRoomsByPriceRange(
        @Query('minPrice') minPrice: string,
        @Query('maxPrice') maxPrice: string,
    ): Promise<RoomEntity[]> {
        console.log('Метод getRoomsByPriceRange вызван');

        const min = parseFloat(minPrice);
        const max = parseFloat(maxPrice);

        console.log('Запрос на фильтрацию по цене:', min, max);

        if (isNaN(min) || isNaN(max)) {
            throw new BadRequestException('minPrice и maxPrice должны быть числами');
        }

        return this.roomsService.getRoomsByPriceRange(min, max);
    }

    @Get('bedrooms/:numBedrooms')
    async getRoomsByBedrooms(@Param('numBedrooms') numBedrooms: number): Promise<RoomEntity[]> {
        return this.roomsService.getRoomsByBedrooms(numBedrooms);
    }

    @Put(':id')
    async updateRoom(@Param('id') id: number, @Body() createRoomDto: CreateRoomDto): Promise<RoomEntity | null> {
        return this.roomsService.updateRoom(id, createRoomDto);
    }

    @Delete(':id')
    async deleteRoom(@Param('id') id: number): Promise<void> {
        await this.roomsService.deleteRoom(id);
    }

    @Get('available/filter')
    async getAvailableRoomsByDate(
        @Query('check_in') check_in: Date,
        @Query('check_out') check_out: Date
    ): Promise<RoomEntity[]> {
        return await this.roomsService.getAvailableRoomsByDate(new Date(check_in), new Date(check_out));
    }

    @Get('available/moment')
    async getAvailableRooms(): Promise<RoomEntity[]> {
        return await this.roomsService.getAvailableRooms();
    }

    @Get('cleaning/moment')
    async getRoomsInCleaning(): Promise<RoomEntity[]> {
        return await this.roomsService.getRoomsInCleaning();
    }

    @Get('booked/moment')
    async getBookedRooms(): Promise<RoomEntity[]> {
        return await this.roomsService.getBookedRooms();
    }

}