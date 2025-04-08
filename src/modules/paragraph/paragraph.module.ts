import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paragraph } from './entities/paragraph.entity';
import { ParagraphController } from './paragraph.controller';
import { ParagraphService } from './paragraph.service';

@Module({
  imports: [TypeOrmModule.forFeature([Paragraph])],
  controllers: [ParagraphController],
  providers: [ParagraphService],
  exports: [ParagraphService],
})
export class ParagraphModule {}
