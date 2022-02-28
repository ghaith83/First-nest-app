import { Global, Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './service/todo.service';

@Global()
@Module({
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {
    
}
