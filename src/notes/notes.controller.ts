import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import {
  MY_DYNAMIC_CONFIG,
  MyDynamicModuleConfigs,
} from 'src/my-dynamic/my-dynamic.module';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(
    private readonly notesService: NotesService,
    @Inject(MY_DYNAMIC_CONFIG)
    private readonly myDynamicModuleConfig: MyDynamicModuleConfigs,
  ) {
    console.log('NotesController', this.myDynamicModuleConfig);
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    const notes = await this.notesService.findAll(paginationDto);
    return notes;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.notesService.findOne(id);
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
    return this.notesService.remove(id);
  }
}
