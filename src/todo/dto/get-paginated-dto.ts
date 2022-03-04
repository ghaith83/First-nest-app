import { Type } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { type } from "os";

export class GetpaginatedTdo{
    @IsOptional()
    @Type(()=>Number)
    @IsNumber()
page:number;
@IsOptional()
    @Type(()=>Number)
    @IsNumber()
item:number;
}