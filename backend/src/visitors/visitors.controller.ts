import { Controller, Get, Post, Body, Param, Patch, Delete, NotFoundException } from '@nestjs/common';
import { VisitorsService } from './visitors.service';
import { VisitorEntity } from './entity/visitor.entity';
import { CreateVisitorDto } from './dtos/createVisitor.dto';
import { UpdateVisitorDto } from './dtos/updateVisitor.dto';

@Controller('visitors')
export class VisitorsController {
    constructor(private readonly visitorsService: VisitorsService) {}

    // Получить всех посетителей
    @Get()
    async findAll(): Promise<VisitorEntity[]> {
        return this.visitorsService.findAll();
    }

    // Получить одного посетителя по ID
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<VisitorEntity> {
        const visitor = await this.visitorsService.findOne(id);
        if (!visitor) {
            throw new NotFoundException(`Посетитель с ID ${id} не найден`);
        }
        return visitor;
    }

    // Создать нового посетителя
    @Post()
    async create(@Body() createVisitorDto: CreateVisitorDto): Promise<VisitorEntity> {
        return this.visitorsService.create(createVisitorDto);
    }

    // Обновить существующего посетителя
    @Patch(':id')
    async update(@Param('id') id: number, @Body() updateVisitorDto: UpdateVisitorDto): Promise<VisitorEntity> {
        const visitor = await this.visitorsService.findOne(id);
        if (!visitor) {
            throw new NotFoundException(`Посетитель с ID ${id} не найден`);
        }
        return this.visitorsService.update(id, updateVisitorDto);
    }

    // Удалить посетителя
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        const visitor = await this.visitorsService.findOne(id);
        if (!visitor) {
            throw new NotFoundException(`Посетитель с ID ${id} не найден`);
        }
        await this.visitorsService.remove(id);
    }
}