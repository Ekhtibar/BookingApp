import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from './entity/booking.entity';
import { BookingsController } from './bookings.controller';
import { VisitorEntity } from 'src/visitors/entity/visitor.entity';
import { RoomEntity } from 'src/rooms/entity/Room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookingEntity, VisitorEntity, RoomEntity])],
  providers: [BookingsService],
  exports: [BookingsService],
  controllers: [BookingsController]

})
export class BookingsModule {}
