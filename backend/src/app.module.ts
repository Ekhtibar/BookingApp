import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { RoomsController } from './rooms/rooms.controller';
import { RoomsModule } from './rooms/rooms.module';
import { BookingsController } from './bookings/bookings.controller';
import { BookingsModule } from './bookings/bookings.module';
import { VisitorsModule } from './visitors/visitors.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), RoomsModule, BookingsModule, VisitorsModule],
  controllers: [RoomsController, BookingsController],
  providers: [],
})
export class AppModule {}
