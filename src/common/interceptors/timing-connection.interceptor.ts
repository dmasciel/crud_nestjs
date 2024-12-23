import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';

@Injectable()
export class TimingConnectionInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const startTime = Date.now();
    console.log('TimingConnectionInterceptor executado ANTES');

    await new Promise(resolve => setTimeout(resolve, 1000));

    return next.handle().pipe(
      tap(() => {
        const endTime = Date.now();
        const elapsed = endTime - startTime;
        // console.log(
        //   `TimingConnectionInterceptor levou ${elapsed}ms para executar`,
        // );
        //console.log(data);
      }),
    );
  }
}
