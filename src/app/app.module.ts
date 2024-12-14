import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesModule } from 'src/notes/notes.module';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
