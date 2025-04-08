import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chunk } from './entities/chunk.entity';
import { ChunkController } from './chunk.controller';
import { ChunkService } from './chunk.service';

@Module({
  imports: [TypeOrmModule.forFeature([Chunk])],
  controllers: [ChunkController],
  providers: [ChunkService],
  exports: [ChunkService],
})
export class ChunkModule {}
