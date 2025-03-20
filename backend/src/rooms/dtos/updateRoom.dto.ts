/* eslint-disable prettier/prettier */

import { IsString, IsBoolean, IsNumber, IsOptional } from "class-validator";

export class UpdateRoomDto {

    @IsOptional()
    @IsString({ message: 'Название номера должно быть строкой' })
    name?: string;

    @IsOptional()
    @IsString({ message: 'Категория номера должна быть строкой' })
    category?: string;

    @IsOptional()
    @IsString({ message: 'Описание должно быть строкой' })
    description?: string;

    @IsOptional()
    @IsBoolean({ message: 'Балкон должен быть булевым значением' })
    balcony?: boolean;

    @IsOptional()
    @IsNumber({}, { message: 'Количество спален должно быть числом' })
    bedrooms?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Цена за ночь должна быть числом' })
    pricePerNight?: number;

    @IsOptional()
    @IsString({ message: 'Изображение должно быть строкой' })
    imageUrl?: string;
}