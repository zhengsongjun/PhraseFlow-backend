import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chunk } from './entities/chunk.entity';
import { CreateChunkDto } from './dto/create-chunk.dto';
import { UpdateChunkDto } from './dto/update-chunk.dto';
import { CreateSmartArticleChunkDto } from './dto/create-smart-article-chunk.dto';

@Injectable()
export class ChunkService {
  constructor(
    @InjectRepository(Chunk)
    private readonly chunkRepo: Repository<Chunk>
  ) {}

  toIdFindAllChunks(id: string): Promise<Chunk[]> {
    return this.chunkRepo.findBy({ paragraphId: id });
  }

  create(dto: CreateChunkDto): Promise<Chunk> {
    const chunk = this.chunkRepo.create({
      ...dto,
    });
    return this.chunkRepo.save(chunk);
  }

  createSmartArticleChunks(dto: CreateSmartArticleChunkDto) {
    const chunk = this.chunkRepo.create({
      ...dto,
    });
    return this.chunkRepo.save(chunk);
  }

  async toSmartArticleIdGetChunkS(smartArticleId: string) {
    const chunks = await this.chunkRepo.findBy({ smartArticleId });
    return chunks;
  }

  batchCreate(dtoList: CreateChunkDto[]): Promise<Chunk[]> {
    const chunks = dtoList.map((dto) =>
      this.chunkRepo.create({
        ...dto,
      })
    );
    return this.chunkRepo.save(chunks);
  }

  update(id: string, dto: UpdateChunkDto): Promise<Chunk> {
    return this.chunkRepo.save({ id, ...dto });
  }

  findAll(): Promise<Chunk[]> {
    return this.chunkRepo.find();
  }

  findOne(id: string): Promise<Chunk | null> {
    return this.chunkRepo.findOne({ where: { id } });
  }
}
