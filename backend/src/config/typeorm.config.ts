import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      synchronize: true,
      database: 'booking-db',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
}