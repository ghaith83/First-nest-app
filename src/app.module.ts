import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoController } from './todo/todo.controller';
import { TodoModule } from './todo/todo.module';
import { user } from './user/user.entity';
import { UserModule } from './user/user.module';



@Module({
  imports: [TodoModule,
    ConfigModule.forRoot({isGlobal:true}),
    //configuration ORM data base on postgres
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'todo',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities:true
    }),
    UserModule

    
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
