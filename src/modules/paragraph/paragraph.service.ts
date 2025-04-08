import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paragraph } from './entities/paragraph.entity';
import { CreateParagraphDto } from './dto/create-paragraph.dto';
import { UpdateParagraphDto } from './dto/update-paragraph.dto';

@Injectable()
export class ParagraphService {
  constructor(
    @InjectRepository(Paragraph)
    private readonly paragraphRepo: Repository<Paragraph>
  ) {}

  create(dto: CreateParagraphDto): Promise<Paragraph> {
    const paragraph = this.paragraphRepo.create({
      ...dto,
      article: { id: dto.articleId },
    });
    return this.paragraphRepo.save(paragraph);
  }

  update(id: string, dto: UpdateParagraphDto): Promise<Paragraph> {
    return this.paragraphRepo.save({ id, ...dto });
  }

  findAll(): Promise<Paragraph[]> {
    return this.paragraphRepo.find();
  }

  findOne(id: string): Promise<Paragraph | null> {
    return this.paragraphRepo.findOne({ where: { id } });
  }

  async toArticleIdGetParagraphList(articleId: string): Promise<Paragraph[]> {
    try {
      const result = await this.paragraphRepo.find({
        where: { articleId },
      });
      return result;
    } catch (error) {
      throw error;
    }
  } // ✅ ← 你缺了这个大括号！
}
