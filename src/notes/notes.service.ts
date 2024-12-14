import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
  ) {}

  throwNotFoundError() {
    throw new NotFoundException('Note not found');
  }

  async findAll() {
    const notes = await this.noteRepository.find();
    //console.log('teste');
    return notes;
    //return this.notes;
  }

  async findOne(id: number) {
    //const note = this.notes.find(item => item.id === id);
    const note = await this.noteRepository.findOne({
      where: {
        id,
      },
    });
    if (note) return note;
    this.throwNotFoundError();
  }

  async create(createNoteDto: CreateNoteDto) {
    const newNote = {
      ...createNoteDto,
      read: false,
      created_at: new Date(),
    };
    const note = await this.noteRepository.create(newNote);
    return this.noteRepository.save(note);
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const partialUpdateNoteDto = {
      read: updateNoteDto?.read,
      text: updateNoteDto?.text,
    };
    const note = await this.noteRepository.preload({
      id,
      ...partialUpdateNoteDto,
    });
    if (!note) return this.throwNotFoundError();
    await this.noteRepository.save(note);
    return note;
  }

  async remove(id: number) {
    const note = await this.noteRepository.findOneBy({ id });

    if (!note) return this.throwNotFoundError();
    return this.noteRepository.remove(note);
  }
}
