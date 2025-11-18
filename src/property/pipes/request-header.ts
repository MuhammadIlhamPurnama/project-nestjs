import { createParamDecorator, ExecutionContext, BadRequestException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";

export const RequestHeader = createParamDecorator((targetDto: any, ctx: ExecutionContext) => {
  const headers = ctx.switchToHttp().getRequest()?.headers ?? {};

  // jika tidak diberikan DTO class, kembalikan plain headers
  if (!targetDto || typeof targetDto !== 'function') {
    return headers;
  }

  // transform headers ke instance DTO (aktifkan implicit conversion jika mau)
  const dto = plainToInstance(targetDto, headers, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true // aktifkan jika pakai @Expose di DTO
  });

  // validasi sinkron dan lempar BadRequestException jika ada error
  const errors = validateSync(dto, { whitelist: true, forbidNonWhitelisted: false });
  if (errors.length) {
    throw new BadRequestException(errors);
  }

  return dto;
});