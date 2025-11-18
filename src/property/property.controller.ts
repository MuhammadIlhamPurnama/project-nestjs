import { Body, Controller, Get, Headers, HttpCode, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { IdParamDto } from './dto/idParam.dto';
import { ParseIdPipe } from './pipes/parseIdPipe';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import { createPropertySchema } from './dto/createPropertyZod.dto';
import type {CreatePropertyZodDto} from './dto/createPropertyZod.dto';
import { RequestHeader } from './pipes/request-header';
import { HeadersDto } from './dto/headers.dto';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  @Get()
  findAll(): string {
    return this.propertyService.findAll()
  }

  @Get(":id/:slug")
  findOne(@Param("id") id: string, @Param("slug") slug) {
    return this.propertyService.findOne()
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
  create(@Body() body: CreatePropertyZodDto) {
    return this.propertyService.create()
  }

  @Patch(":id")
  update(@Param("id", ParseIdPipe) id,@Body() body: CreatePropertyDto, @RequestHeader(HeadersDto) header:HeadersDto) {
    return this.propertyService.update()
  }
}
