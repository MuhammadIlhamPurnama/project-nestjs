import { Body, Controller, Get, HttpCode, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';

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
  create(@Body() body: CreatePropertyDto) {
    return body
  }

  @Patch(":id")
  update(@Body() body: CreatePropertyDto) {
    return body
  }
}
