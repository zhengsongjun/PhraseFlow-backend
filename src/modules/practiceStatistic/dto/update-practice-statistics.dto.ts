import { IsString } from 'class-validator';

export class UpdatePracticeStatistics {
  @IsString()
  articleId: string;

  @IsString()
  type: string;
}
