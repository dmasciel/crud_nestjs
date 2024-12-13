import { Injectable, NotFoundException } from '@nestjs/common';
import { Note } from './entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  private lastId = 1;
  private notes: Note[] = [
    {
      id: 1,
      text: 'Este é um recado de teste',
      from: 'Joana',
      to: 'João',
      read: false,
      created_at: new Date(),
    },
  ];
  throwNotFoundError() {
    throw new NotFoundException('Note not found');
  }

  findAll() {
    return this.notes;
  }

  findOne(id: number) {
    const note = this.notes.find(item => item.id === id);
    if (note) return note;
    this.throwNotFoundError();
  }

  create(createNoteDto: CreateNoteDto) {
    this.lastId++;
    const id = this.lastId;
    const newNote = {
      id,
      ...createNoteDto,
      read: false,
      created_at: new Date(),
    };
    this.notes.push(newNote);
    return newNote;
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    const existingNoteIndex = this.notes.findIndex(item => item.id === id);

    if (existingNoteIndex < 0) {
      this.throwNotFoundError();
    }
    const existingNote = this.notes[existingNoteIndex];
    this.notes[existingNoteIndex] = {
      ...existingNote,
      ...updateNoteDto,
    };
    return this.notes[existingNoteIndex];
  }

  remove(id: number) {
    const existingNoteIndex = this.notes.findIndex(item => item.id === id);

    if (existingNoteIndex < 0) {
      this.throwNotFoundError();
    }
    const note = this.notes[existingNoteIndex];
    this.notes.splice(existingNoteIndex, 1);
    return note;
  }
}
