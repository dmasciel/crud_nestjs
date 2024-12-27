import { Injectable } from '@nestjs/common';

@Injectable()
export class NotesUtils {
  reverseString(str: string) {
    return str.split('').reverse().join('');
  }
}
