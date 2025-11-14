import { Body, Controller, Get, HttpCode, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { IdParamDto } from './dto/idParam.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import { createPropertySchema } from './dto/createPropertyZod.dto';
import type {CreatePropertyZodDto} from './dto/createPropertyZod.dto';

@Controller('property')
export class PropertyController {
  @Get()
  findAll(): string {
    return "All property"
  }

  @Get(":id/:slug")
  findOne(@Param("id") id: string, @Param("slug") slug):string {
    return `id = ${id}, slug= ${slug}`
  }

  @Get(":param")
  @HttpCode(202)
  findByParam(@Param("param", ParseIntPipe) param, @Query("sort", ParseBoolPipe) sort) {
    console.log(typeof sort)
    return typeof param
  }

  @Post()
  // @UsePipes(new ValidationPipe({
  //   whitelist:true,
  //   forbidNonWhitelisted: true
  // })) 
  // bisa pakai usePipes diatas, bisa juga dimasukin ke body decoration
  @UsePipes(new ZodValidationPipe(createPropertySchema))
  create(@Body() body: CreatePropertyZodDto) {
    return body
  }

  @Patch(":id")
  update(@Param("id", ParseIdPipe) id,@Body() body: CreatePropertyDto) {
    return id
  }
}
