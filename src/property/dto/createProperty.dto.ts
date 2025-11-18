import { IsNumber, IsPositive, IsString, Length } from "class-validator";

export class CreatePropertyDto {
  @IsString()
  @Length(2, 50)
  //  @Length(2, 10, {message: "Error length must 2 - 10 chars"}) <--- custome error message
  name: string;

  @IsString()
  @Length(2,50, {groups: ['create']})
  @Length(1,50, {groups: ['update']})
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;
}