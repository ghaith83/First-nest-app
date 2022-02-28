import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { user } from './user.entity';


@Injectable()
export class UserService {
  
    constructor(
        @InjectRepository(user) 
        private readonly userRepository:Repository<user> 
    ){}
    //
    async create(data:any):Promise<user>{
        return this.userRepository.save(data);
    }

    async findone(data:any):Promise<user>{
        
        return this.userRepository.findOne(data)
        
         
    }




}
