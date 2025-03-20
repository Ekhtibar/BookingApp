import { IsOptional, IsDateString, IsEnum, IsNumber } from 'class-validator';

export class UpdateBookingDto {
    @IsOptional()
    @IsNumber({}, { message: 'ID посетителя должен быть числом' })
    visitorId?: number;

    @IsOptional()
    @IsNumber({}, { message: 'ID комнаты должен быть числом' })
    roomId?: number;

    @IsOptional()
    @IsDateString({}, { message: 'Дата заезда должна быть корректной датой' })
    check_in?: Date;

    @IsOptional()
    @IsDateString({}, { message: 'Дата выезда должна быть корректной датой' })
    check_out?: Date;

    @IsOptional()
    @IsEnum(['active', 'canceled', 'completed'], { message: 'Статус должен быть одним из: active, canceled, completed' })
    status?: 'active' | 'canceled' | 'completed';
}