import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ParseIntIdPipe } from 'src/common/pipes/parse.int-id-pipe';
import { NotesUtils } from 'src/notes/notes.utils';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PeopleService } from './people.service';

@Controller('people')
@UsePipes(ParseIntIdPipe)
export class PeopleController {
  constructor(
    private readonly peopleService: PeopleService,
    private readonly notesUtils: NotesUtils,
  ) {}

  @Post()
  create(@Body() createPeopleDto: CreatePersonDto) {
    return this.peopleService.create(createPeopleDto);
  }

  @Get()
  findAll() {
    //console.log(this.notesUtils.reverseString('abc'));
    return this.peopleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.peopleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePeopleDto: UpdatePersonDto) {
    return this.peopleService.update(+id, updatePeopleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peopleService.remove(+id);
  }
}
