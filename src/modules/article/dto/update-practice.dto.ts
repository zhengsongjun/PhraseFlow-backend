export class UpdatePracticeDto {
  type: 'word' | 'chunk' | 'paragraph';
  count: number; // 练习完成次数（一般是前端 +1 后传）
}