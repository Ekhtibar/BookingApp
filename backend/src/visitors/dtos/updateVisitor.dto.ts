import { IsOptional, IsString } from 'class-validator';

export class UpdateVisitorDto {
    @IsOptional()
    @IsString({ message: 'Имя должно быть строкой' })
    firstname?: string; 

    @IsOptional()
    @IsString({ message: 'Фамилия должна быть строкой' })
    lastname?: string; 

    @IsOptional()
    @IsString({ message: 'Отчество должно быть строкой' })
    surname?: string; 
}