import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AddHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';
import { AuthTokenInterceptor } from 'src/common/interceptors/auth-token.interceptor';
import { ParseIntIdPipe } from 'src/common/pipes/parse.int-id-pipe';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesService } from './notes.service';

@Controller('notes')
@UsePipes(ParseIntIdPipe)
@UseInterceptors(
  AddHeaderInterceptor,
  AuthTokenInterceptor,
  // TimingConnectionInterceptor,
  // ErrorHandlingInterception,
  // SimpleCacheInterceptor,
  // ChangeDataInterceptor,
)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    const notes = await this.notesService.findAll(paginationDto);
    //throw new Error('Erro ao buscar as notas');
    return notes;
  }

  @Get(':id')
  @UsePipes(ParseIntIdPipe)
  findOne(@Param('id') id: number) {
    //console.log(id, typeof id);
    //console.log(id, typeof id);
    return this.notesService.findOne(id);
    //return `This route returns a single note ID ${id}`;
  }

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    //console.log(id, typeof id);
    return this.notesService.remove(id);
  }
}
