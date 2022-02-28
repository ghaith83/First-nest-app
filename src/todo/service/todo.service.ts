import { Injectable, NotFoundException } from '@nestjs/common';
import { addTodoto } from '../dto/add-todo-tdo';
import { todo } from '../models/Todo.entity';

@Injectable()
export class TodoService {
    todos:todo[]=[]
    getTodos():todo[]{
     return this.todos;
    }

    getTodoById(id:number):todo{
      const todo=this.todos.find((myTodo)=>myTodo.id===id)
      if(todo)
      return todo
      throw new NotFoundException('todo de id '+id+' not found')
    }

    addTodo(newTodo:addTodoto):todo{
        
        const {firstName,lastName}=newTodo;
        
        let id;
       if(this.todos.length){
           id=this.todos[this.todos.length-1].id+1;
       }else{
        id=1
       }
       
       const todo= {
           firstName,
           lastName,
           id,
           createdAt:new Date()
       }
       this.todos.push(todo)
       return todo
    }
    deleteTodo(id:number):object{
        const index=this.todos.findIndex((todo)=>todo.id===id)
        if(index>=0){
            this.todos.splice(index,1)
        }else
        {
            throw new NotFoundException('todo de id '+id+' not found')
        }
        return{
            message:'todo de id '+id+' a été supprimer bien succe'
            ,count:1
        }
        
    }
  
    modifierTodo(id:number,newTodo:Partial<addTodoto>):todo{
        const todo=this.getTodoById(id);
        todo.firstName=newTodo.firstName?newTodo.firstName:todo.firstName,
        todo.lastName=newTodo.lastName?newTodo.lastName:todo.lastName
        return todo
    }

}
