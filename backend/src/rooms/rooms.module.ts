import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from './entity/Room.entity';
import { BookingEntity } from 'src/bookings/entity/booking.entity';
import { VisitorEntity } from 'src/visitors/entity/visitor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity, BookingEntity, VisitorEntity])],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService]
})
export class RoomsModule {}
