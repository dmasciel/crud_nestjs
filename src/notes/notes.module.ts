import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeoplesModule } from 'src/people/people.module';
import { Note } from './entities/note.entity';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Note]), PeoplesModule],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
