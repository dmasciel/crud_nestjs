import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorHandlingInterception implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    //console.log('ErrorHandlingInterception executado ANTES');

    //await new Promise(resolve => setTimeout(resolve, 3000));

    return next.handle().pipe(
      catchError(error => {
        //console.log('DEU ERRO');
        //console.log(error.name);
        //console.log(error.message);
        return throwError(() => error);
      }),
    );
  }
}
