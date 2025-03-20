import { IsNotEmpty, IsString, IsBoolean, IsNumber, IsOptional } from "class-validator";

export class CreateRoomDto {
    @IsNotEmpty({ message: 'Название номера обязательно' })
    @IsString({ message: 'Название номера должно быть строкой' })
    name: string;

    @IsNotEmpty({ message: 'Категория номера обязательна' })
    @IsString({ message: 'Категория номера должна быть строкой' })
    category: string;

    @IsOptional()
    @IsString({ message: 'Описание должно быть строкой' })
    description?: string;

    @IsNotEmpty({ message: 'Необходима информация о наличии балкона' })
    @IsBoolean({ message: 'Балкон должен быть булевым значением' })
    balcony: boolean;

    @IsNotEmpty({ message: 'Количество спален обязательно' })
    @IsNumber({}, { message: 'Количество спален должно быть числом' })
    bedrooms: number;

    @IsNotEmpty({ message: 'Цена за ночь обязательна' })
    @IsNumber({}, { message: 'Цена за ночь должна быть числом' })
    pricePerNight: number;

    @IsNotEmpty({ message: 'Вместимость гостей обязательна' })
    @IsNumber({}, { message: 'Вместимость должна быть числом' })
    capacity: number; 

    @IsOptional()
    @IsString({ message: 'Изображение должно быть строкой' })
    imageUrl?: string;
}