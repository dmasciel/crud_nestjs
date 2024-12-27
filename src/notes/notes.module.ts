import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeoplesModule } from 'src/people/people.module';
import { Note } from './entities/note.entity';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { NotesUtils } from './notes.utils';

@Module({
  imports: [TypeOrmModule.forFeature([Note]), forwardRef(() => PeoplesModule)],
  controllers: [NotesController],
  providers: [NotesService, NotesUtils],
  exports: [NotesUtils],
})
export class NotesModule {}
