import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VisitorEntity } from './entity/visitor.entity';
import { Repository } from 'typeorm';
import { UpdateVisitorDto } from './dtos/updateVisitor.dto';
import { CreateVisitorDto } from './dtos/createVisitor.dto';

@Injectable()
export class VisitorsService {
    constructor(
        @InjectRepository(VisitorEntity) private visitorsRepository: Repository<VisitorEntity>
    ){}

    async create(visitor: CreateVisitorDto): Promise<VisitorEntity> {
        return await this.visitorsRepository.save(visitor);
    }

    async findAll(): Promise<VisitorEntity[]> {
        return await this.visitorsRepository.find();
    }

    async findOne(id: number): Promise<VisitorEntity | null > {
        return await this.visitorsRepository.findOne({ where: { id: id } });
    }

    async update(id: number, visitor: UpdateVisitorDto): Promise<VisitorEntity> {
        return await this.visitorsRepository.save({...visitor, id });
    }

    async remove(id: number): Promise<void> {
        await this.visitorsRepository.delete({ id });
    }
}
