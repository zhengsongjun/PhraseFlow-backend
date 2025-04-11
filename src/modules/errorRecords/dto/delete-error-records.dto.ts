import { IsString } from 'class-validator';

export class DeleteErrorRecordDto {
  @IsString()
  chunkId: string;
}
