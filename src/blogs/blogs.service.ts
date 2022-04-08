import { BlogEntity as Blog } from './entities/blog.entity';
import { BlogRepository } from './blogs.repository';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(BlogRepository) private blogRepository: BlogRepository,
  ) {}

  async create(req: any, createBlogDto: CreateBlogDto): Promise<Blog> {
    const jwt = req.cookies['jwt'];
    console.log(jwt);
    if (!jwt) throw new UnauthorizedException('먼저 로그인을 해야 합니다');

    return this.blogRepository.createBlog(createBlogDto);
  }

  findAll(): Promise<Blog[]> {
    return this.blogRepository.find();
  }

  findOne(id: number): Promise<Blog> {
    return this.blogRepository.findOne({ id });
  }

  async update(id: number, updateData: CreateBlogDto) {
    // 주어진 id로 게시글 찾고 업데이트
    const found = await this.blogRepository.findOne({ id });
    const { title, description } = updateData;

    if (!found) throw new NotFoundException('대상 게시글이 존재하지 않습니다');

    title ? (found.title = title) : '';
    description ? (found.description = description) : '';
    await found.save();

    return found;
  }

  async remove(id: string): Promise<string> {
    const deleted = await this.blogRepository.delete(id);
    console.log(deleted); // DeleteResult { raw: [], affected: 1 }
    if (!deleted.affected)
      throw new NotFoundException('대상 게시글이 존재하지 않습니다');
    return 'deleted';
  }
}
