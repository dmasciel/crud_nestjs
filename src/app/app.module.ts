import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorExceptionFilter } from 'src/common/filters/error-exception.filter';
import { IsAdminGuard } from 'src/common/guards/is-admin.guards';
import { SimpleMiddleware } from 'src/common/middlewares/simple.middleware';
import { NotesModule } from 'src/notes/notes.module';
import { PeoplesModule } from 'src/people/people.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      database: 'crud_nestjs',
      username: 'postgres',
      password: 'postgres',
      autoLoadEntities: true, //carrega entidades sem precisar especifica-las
      synchronize: true, //Sincroniza com BD. não usar em produção pois pode perder dados.
    }),
    ConfigModule.forRoot(),
    NotesModule,
    PeoplesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_FILTER',
      useClass: ErrorExceptionFilter,
    },
    {
      provide: 'APP_GUARD',
      useClass: IsAdminGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SimpleMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
