import { IsNumber, IsPositive, IsString, Length } from "class-validator";

export class CreatePropertyDto {
  @IsString()
  @Length(2, 10)
  //  @Length(2, 10, {message: "Error length must 2 - 10 chars"}) <--- custome error message
  name: string;

  @IsString()
  @Length(2,10, {groups: ['create']})
  @Length(1,10, {groups: ['update']})
  description: string;

  @IsNumber()
  @IsPositive()
  area: number;
}