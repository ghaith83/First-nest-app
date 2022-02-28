import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { addTodoto } from './dto/add-todo-tdo';
import { TodoService } from './service/todo.service';


@Controller('todo')
export class TodoController {
    constructor(private todoservice:TodoService){
       
    }
   
    
    @Get( "get")
    getTodo2(
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

    @Get( )
    getTodov(
        @Query()mesQuery
    ){
        console.log(mesQuery)
        return this.todoservice.getTodos()
    }
//get 
    @Get("/:id")
    getTodoById(
        @Param('id')id,
        
    ){
      return this.todoservice.getTodoById(+id);
    }


    @Post()
    addTodo(
        @Body()newTodo:addTodoto){
        return this.todoservice.addTodo(newTodo);
    }

    @Delete(':id')
    deleteTodo(
        @Param('id')indexTodo
    ){
        return this.todoservice.deleteTodo(+indexTodo);
        
    }
    @Put(':id')
    modifierTodo(
        @Param('id')id,
        @Body()newTodo:Partial<addTodoto>
    ){
       return this.todoservice.modifierTodo(+id,newTodo)
    }
}
