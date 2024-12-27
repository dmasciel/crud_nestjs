import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyDynamicModule } from 'src/my-dynamic/my-dynamic.module';
import { PeoplesModule } from 'src/people/people.module';
import { Note } from './entities/note.entity';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { NotesUtils } from './notes.utils';

@Module({
  imports: [
    TypeOrmModule.forFeature([Note]),
    forwardRef(() => PeoplesModule),
    MyDynamicModule.register({
      apiKey: 'my-api-key abc',
      apiURL: 'my-api-url abc',
    }),
  ],
  controllers: [NotesController],
  providers: [NotesService, NotesUtils],
  exports: [NotesUtils],
})
export class NotesModule {}
