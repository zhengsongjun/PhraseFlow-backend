import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Word } from './entities/word.entity';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(Word)
    private readonly wordRepo: Repository<Word>
  ) {}

  create(dto: CreateWordDto): Promise<Word> {
    const word = this.wordRepo.create({
      ...dto,
    });
    return this.wordRepo.save(word);
  }

  update(id: string, dto: UpdateWordDto): Promise<Word> {
    return this.wordRepo.save({ id, ...dto });
  }

  findAll(): Promise<Word[]> {
    return this.wordRepo.find();
  }

  findOne(id: string): Promise<Word | null> {
    return this.wordRepo.findOne({ where: { id } });
  }
}
