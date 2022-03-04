import { min, MinLength, minLength } from "class-validator";
import { timestime } from "src/timstime/timestime.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('cv')
export class CvEntity extends timestime{
    @PrimaryGeneratedColumn()
    Id:number
    @Column()
    @MinLength(4)
    name:string
    @Column()
    firstName:string
    @Column()
    age:number
    @Column()
    cin:number
    @Column()
    job:string
    @Column()
    path:string

}
