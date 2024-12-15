import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    try {
      const personDto = {
        name: createPersonDto.name,
        passwordHash: createPersonDto.password,
        email: createPersonDto.email,
      };
      const newPerson = this.personRepository.create(personDto);
      await this.personRepository.save(newPerson);
      return newPerson;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email is already registered');
      }
      throw error;
    }
  }

  async findAll() {
    const person = await this.personRepository.find({
      order: {
        id: 'desc',
      },
    });

    return person;
  }

  async findOne(id: number) {
    const person = await this.personRepository.findOneBy({
      id,
    });
    if (!person) {
      throw new NotFoundException('Person not found');
    }
    return person;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const personDto = {
      name: updatePersonDto?.name,
      passwordHash: updatePersonDto?.password,
    };
    const person = await this.personRepository.preload({
      id,
      ...personDto,
    });
    if (!person) {
      throw new NotFoundException('Person not found');
    }
    return this.personRepository.save(person);
  }

  async remove(id: number) {
    const person = await this.personRepository.findOneBy({
      id,
    });
    if (!person) {
      throw new NotFoundException('Person not found');
    }
    return this.personRepository.remove(person);
  }
}
