import { BlogEntity } from './../entities/blog.entity';
import { PickType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBlogDto extends PickType(BlogEntity, [
  'title',
  'description',
] as const) {
  title: string;

  description: string;
}
