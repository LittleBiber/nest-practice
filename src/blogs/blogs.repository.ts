import { EntityRepository, Repository } from 'typeorm';
import { BlogEntity as Blog } from './entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
// DB에 저장할 수 있게 TypeORM에서
// Blog형식의 데이터를 저장
// DTO를 전달받을 것이므로 DTO import

@EntityRepository(Blog)
export class BlogRepository extends Repository<Blog> {
  async createBlog(createBlogDto: CreateBlogDto): Promise<Blog> {
    const { title, description } = createBlogDto;

    const blog = this.create({
      title,
      description,
      userId: 1,
    });

    await this.save(blog);
    return blog;
  }
}
