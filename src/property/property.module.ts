import { Module, ValidationPipe } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { APP_PIPE } from '@nestjs/core';

@Module({
  controllers: [PropertyController],
  // providers: [
  //   {
  //     provide: APP_PIPE,
  //     //useClass: ValidationPipe // jika tidak ingin menggunakan option
  //     useValue: new ValidationPipe({
  //       whitelist: true,
  //       forbidNonWhitelisted: true,
  //       always: true,
  //       // groups: ['create'] // <-- bisa tambahin group juga, tapi semua request di module property akan tervalidasi
  //       transform: true,
  //       transformOptions: {
  //         enableImplicitConversion: true
  //       }
  //     })
  //   },
  // ]
  // jika menggunakan validation di module seperti ini, groups juga tidak jalan
})
export class PropertyModule {}
