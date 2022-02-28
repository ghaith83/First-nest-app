import { Global, Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from './user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([user]),
  JwtModule.register({secret:'secret',signOptions:{expiresIn:"1d"}})],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
