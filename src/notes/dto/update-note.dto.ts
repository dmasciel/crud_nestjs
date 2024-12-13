import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteDto } from './create-note.dto';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  @IsBoolean()
  @IsOptional()
  readonly read?: boolean;
}
