import { BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { Request, Response } from 'express';
import { user } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
      private jwtService: JwtService,
      private readonly userservice:UserService){}

      // cree utilisateur  
    @Post('register')
    async register(
    @Body('name')name:string,
    @Body('email')email:string,
    @Body('password')password:string,
    ){
      //hashe le mot de passe : ajouter des bits aleatoire pour le password(12bits) 
      const hashedPassword=await bcrypt.hash(password,12);
       
     const user= this.userservice.create({
          name,
          email,
          password:hashedPassword
      });
      delete (await user).password;
      return user;
    }

    //identification 
    /*signAsync()fonction pour générer notre JWT à partir d'un sous-ensemble 
        des userpropriétés de l'objet, que nous renvoyons ensuite sous la 
        forme d'un objet simple avec une seule access_tokenpropriété.*/
    @Post('login')
    async login(
      @Body('email')email:string,
      @Body('password')password:string,
      @Res({passthrough:true})response:Response
      ){
         const user= await this.userservice.findone({email});
        if(!user || !await bcrypt.compare(password,user.password) ){
        throw new BadRequestException(' warrning  email or password')
        }
        
        
        const jwt=await this.jwtService.signAsync({id:user.id})
        response.cookie('jwt',jwt,{httpOnly:true});
        
        return {message:" succes connection"};
     }




     //authentification 
     /* verifyAsnc() fonction de verifier le jeton du l'utilisateur*/ 
    @Get('user')
    async GetUser(@Req()request:Request){
      try{
        const cookie=request.cookies['jwt']
        const data=await this.jwtService.verifyAsync(cookie)
        if(!data){
          throw new UnauthorizedException();
        }  
      
        const user=await this.userservice.findone({id:data['id']})
        const {password, ...resulta}=user;
        return resulta;
       }catch(e){
        throw new UnauthorizedException();
      }
    }
    //deconnecte : tuer  jeton du l'utilisateur 
    @Post('logout')
    async logout(@Res({passthrough:true})Response:Response){
      Response.clearCookie('jwt')
      return{
        message:"you are logout"
      }
    }
}
