import { IsNotEmpty, IsString, MinLength } from "class-validator"
import { Entity } from "typeorm"

export class addTodoto{
    @IsString()
    @MinLength(3,{message:"la taille minimal 6 caractere" })
    firstName:string
    @IsString()
    @IsNotEmpty()
    lastName:string
}