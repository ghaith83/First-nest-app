import { Controller, Delete, Get, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { get } from 'http';

@Controller('todo')
export class TodoController {
    @Get( "get")
    getTodo(
        @Req()request:Request,
        @Res() response:Response
        
    ){
        //console.log(response)
        //console.log(request)
        console.log("recuperer la list de ToDO")
        response.status(205);
        response.json({content:"je suis la reponse de la 1er controleur"})
        return "get listes de todo"
    }
    @Get( "v2")
    getTodov2(){
        //console.log(response)
        //console.log(request)
        
        return "get listes de todo"
    }
    @Post()
    addTodo(){
        console.log("ajouter la list de ToDO")
        return "listes de todo"
    }
    @Delete()
    deleteTodo(){
        console.log("supprime la list de ToDO")
        return "listes de todo"
    }
    @Put()
    modifierTodo(){
        console.log("recuperer la list de ToDO")
        return "listes de todo"
    }
}
