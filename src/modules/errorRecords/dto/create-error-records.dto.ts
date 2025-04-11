import { IsString } from 'class-validator';

export class CreateErrorRecordDto {
  @IsString()
  chunkId: string;

  @IsString()
  source: string;

  @IsString()
  sourceType: string;
}
