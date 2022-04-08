import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BlogEntity as Blog } from './entities/blog.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @ApiResponse({
    status: 201,
    description: '블로그 생성 성공',
  })
  @ApiResponse({
    status: 401,
    description: '제목 또는 내용이 작성되지 않음',
  })
  @ApiOperation({ summary: '블로그 생성' })
  @Post()
  create(@Req() req: any, @Body() createBlogDto: CreateBlogDto): Promise<Blog> {
    return this.blogsService.create(req, createBlogDto);
  }

  @ApiResponse({
    status: 200,
    description: '블로그 전체 불러오기 성공 ',
  })
  @ApiOperation({ summary: '블로그 전체 보기' })
  @Get()
  findAll(): Promise<Blog[]> {
    return this.blogsService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: '블로그 하나 불러오기 성공',
  })
  @ApiResponse({
    status: 404,
    description: '존재하지 않는 블로그',
  })
  @ApiOperation({ summary: 'id로 블로그 하나 보기' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Blog> {
    return this.blogsService.findOne(+id);
  }

  @ApiResponse({
    status: 200,
    description: '블로그 수정 성공',
  })
  @ApiResponse({
    status: 404,
    description: '존재하지 않는 블로그',
  })
  @ApiOperation({ summary: '블로그 수정' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: CreateBlogDto) {
    return this.blogsService.update(+id, updateData);
    // 왜 +id가 자꾸 되나 했더니 string > number로 자동변환된 것
  }

  @ApiResponse({
    status: 200,
    description: '블로그 삭제 성공',
  })
  @ApiResponse({
    status: 404,
    description: '존재하지 않는 블로그',
  })
  @ApiOperation({ summary: '블로그 삭제' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<string> {
    return this.blogsService.remove(id);
  }
}
