import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from 'src/notes/notes.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), NotesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
