import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVisitorDto {
    @IsNotEmpty({ message: 'Имя обязательно' })
    @IsString({ message: 'Имя должно быть строкой' })
    firstname: string;

    @IsNotEmpty({ message: 'Фамилия обязательна' })
    @IsString({ message: 'Фамилия должна быть строкой' })
    lastname: string;

    @IsNotEmpty({ message: 'Отчество обязательно' }) // Добавлено требование для обязательности
    @IsString({ message: 'Отчество должно быть строкой' })
    surname: string; // Убрали знак вопроса
}