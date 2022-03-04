import { ConsoleLogger, Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class FirstMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
   console.log("first application middleware")
    next();
  }
}
