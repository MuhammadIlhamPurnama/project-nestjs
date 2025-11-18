import { Body, Controller, Delete, Get, Headers, HttpCode, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { IdParamDto } from './dto/idParam.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import { createPropertySchema } from './dto/createPropertyZod.dto';
import type {CreatePropertyZodDto} from './dto/createPropertyZod.dto';
import { RequestHeader } from './pipes/request-header';
import { HeadersDto } from './dto/headers.dto';
import { PropertyService } from './property.service';
import { UpdatePropertyDto } from './dto/updateProperty.dto';

@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  @Get()
  findAll() {
    return this.propertyService.findAll()
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id) {
    return this.propertyService.findOne(id)
  }

  @Get(":param")
  @HttpCode(202)
  findByParam(@Param("param", ParseIntPipe) param, @Query("sort", ParseBoolPipe) sort) {
    console.log(typeof sort)
    return 'test'
  }

  @Post()
  // @UsePipes(new ValidationPipe({
  //   whitelist:true,
  //   forbidNonWhitelisted: true
  // })) 
  // bisa pakai usePipes diatas, bisa juga dimasukin ke body decoration
  @UsePipes(new ZodValidationPipe(createPropertySchema))
  create(@Body() dto: CreatePropertyDto) {
    return this.propertyService.create(dto)
  }

  @Patch(":id")
  update(@Param("id", ParseIdPipe) id,@Body() body: UpdatePropertyDto, @RequestHeader(HeadersDto) header:HeadersDto) {
    return this.propertyService.update(id, body)
  }

  @Delete(":id")
  delete(@Param("id", ParseIdPipe) id) {
    return this.propertyService.delete(id)
  }
}
