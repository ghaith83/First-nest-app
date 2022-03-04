import { isEmail, IsNotEmpty } from "class-validator"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { isSymbolObject } from "util/types"

@Entity('usres')
export class user{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    @IsNotEmpty()
    name:string
    @Column({unique:true})
    email:string
    @Column()
    password:string
}