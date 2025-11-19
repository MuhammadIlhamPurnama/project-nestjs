import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./property.entity";

@Entity()
export class PropertyType {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  value: string

}