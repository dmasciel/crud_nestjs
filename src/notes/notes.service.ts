import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PeopleService } from 'src/people/people.service';
import { Repository } from 'typeorm';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    private readonly peopleService: PeopleService,
  ) {}

  throwNotFoundError() {
    throw new NotFoundException('Note not found');
  }

  async findAll(paginationDto?: PaginationDto) {
    //console.log(this.notesUtils.reverseString('abc'));
    const { limit = 10, offset = 0 } = paginationDto;

    const notes = await this.noteRepository.find({
      take: limit,
      skip: offset,
      relations: ['from', 'to'],
      order: { id: 'desc' },
      select: {
        from: {
          id: true,
          name: true,
        },
        to: {
          id: true,
          name: true,
        },
      },
    });
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
      relations: ['from', 'to'],
      select: {
        from: {
          id: true,
          name: true,
        },
        to: {
          id: true,
          name: true,
        },
      },
    });
    if (note) return note;
    this.throwNotFoundError();
  }

  async create(createNoteDto: CreateNoteDto) {
    const { fromId, toId } = createNoteDto;
    const from = await this.peopleService.findOne(fromId);
    const to = await this.peopleService.findOne(toId);

    const newNote = {
      //...createNoteDto,
      text: createNoteDto.text,
      from,
      to,
      read: false,
      created_at: new Date(),
    };
    const note = await this.noteRepository.create(newNote);
    await this.noteRepository.save(note);
    return {
      ...note,
      from: {
        id: note.from.id,
      },
      to: {
        id: note.to.id,
      },
    };
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const note = await this.findOne(id);

    note.text = updateNoteDto?.text ?? note.text;
    note.read = updateNoteDto?.read ?? note.read;

    await this.noteRepository.save(note);
    return note;
  }

  async remove(id: number) {
    const note = await this.noteRepository.findOneBy({ id });

    if (!note) return this.throwNotFoundError();
    return this.noteRepository.remove(note);
  }
}
