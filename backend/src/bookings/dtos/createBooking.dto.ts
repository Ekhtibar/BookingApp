import { IsNotEmpty, IsDateString, IsEnum, IsNumber, IsArray } from 'class-validator';
import { CreateVisitorDto } from 'src/visitors/dtos/createVisitor.dto';

export class CreateBookingDto {
    @IsNotEmpty({ message: 'Данные посетителей обязательны' })
    @IsArray({ message: 'Данные посетителей должны быть массивом' })
    visitors: CreateVisitorDto[];

    @IsNotEmpty({ message: 'ID комнаты обязательно' })
    @IsNumber({}, { message: 'ID комнаты должен быть числом' })
    roomId: number;

    @IsNotEmpty({ message: 'Дата заезда обязательна' })
    @IsDateString({}, { message: 'Дата заезда должна быть корректной датой' })
    check_in: Date;

    @IsNotEmpty({ message: 'Дата выезда обязательна' })
    @IsDateString({}, { message: 'Дата выезда должна быть корректной датой' })
    check_out: Date;

    @IsNotEmpty({ message: 'Статус бронирования обязателен' })
    @IsEnum(['active', 'canceled', 'completed'], { message: 'Статус должен быть одним из: active, canceled, completed' })
    status: 'active' | 'canceled' | 'completed';
}