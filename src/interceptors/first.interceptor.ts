import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class FirstInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const date =Date.now()
    console.log(" FUNCTION CREATED AT : "+date)
    return next.handle().pipe(tap(()=>{
      const datefin =Date.now()
    console.log(" FUNCTION END AT : "+datefin)
    console.log(" Duration Function" ,datefin-date +'ms')
    }));
  }
}
