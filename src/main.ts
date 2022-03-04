import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv'
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import * as morgan from 'morgan'
import { FirstInterceptor } from './interceptors/first.interceptor';
dotenv.config()
async function bootstrap() {
  const configureCors={origin:['localhost/4200']}
  const app = await NestFactory.create(AppModule);
  
  app.enableCors(configureCors)
  app.use(cookieParser());
  app.useGlobalInterceptors(new FirstInterceptor())
  app.enableCors({
    credentials:true
  })
  app.useGlobalPipes(new ValidationPipe(
    {  transform:true,
      whitelist:true,
    forbidNonWhitelisted:true
    }
  ))
  app.use((req:Request,res:Response,next)=>{
    console.log('middleware from app.use');
    next()
  })
  app.use(morgan('dev'))
  await app.listen(process.env.APP_PORT);
}
bootstrap();
