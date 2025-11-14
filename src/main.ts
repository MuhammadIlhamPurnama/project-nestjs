import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe({
  //   whitelist: true,
  //   forbidNonWhitelisted: true,
  //   always: true
  // }))
  // jika menggunakan global validation, groups validation tidak akan jalan
  // jika menggunakan global validation, hapus validation didalam body decoration
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
