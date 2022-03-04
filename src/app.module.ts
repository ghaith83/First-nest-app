import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirstMiddleware } from './middlewares/first.middleware';
import { logger } from './middlewares/logger';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { PersonModule } from './person/person.module';
import * as dotenv from 'dotenv'

dotenv.config()
@Module({
  imports: [TodoModule,
    ConfigModule.forRoot({isGlobal:true}),
    //configuration ORM data base on postgres
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.postgres_USERNAME,
      password: process.env.POSTGRES_PASSOWRD,
      database: process.env.POSTGRES_DATABASE,
      entities: [process.env.postgres_ENTITY],
      synchronize: true,
      autoLoadEntities:true
    }),
    UserModule,
    PersonModule  
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirstMiddleware)
    .forRoutes('hello',{path:"todo",method:RequestMethod.GET},
    {path:"todo*",method:RequestMethod.DELETE}).apply(logger).forRoutes('')
    .apply(HelmetMiddleware).forRoutes('')
  }
}
