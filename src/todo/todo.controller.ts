import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Query, Req, Res, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import { FirstInterceptor } from 'src/interceptors/first.interceptor';
import { UpperAndFusionPipe } from 'src/pipes/upper-and-fusion.pipe';
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
        @Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_FOUND}))id,
        
    ){
      return this.todoservice.getTodoById(id);
    }
  // add todo list

    @Post()
    addTodo(
        @Body()newTodo:addTodoto){
            console.log(newTodo);
        return this.todoservice.addTodo(newTodo);
    }

    @Delete(':id')
    deleteTodo(
        @Param('id',new ParseIntPipe({
            errorHttpStatusCode:HttpStatus.NOT_FOUND
        }))indexTodo
    ){
        
        return this.todoservice.deleteTodo(indexTodo);
        
    }
    @Put(':id')
    modifierTodo(
        @Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.NOT_FOUND}))id,
        @Body()newTodo:Partial<addTodoto>
    ){
       return this.todoservice.modifierTodo(id,newTodo)
    }
    
    @Post('pipe')
  testPipe(@Body(UpperAndFusionPipe )data){
    return data;
  }
}
