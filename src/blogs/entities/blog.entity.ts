import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BlogEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '블로그 시작합니다',
    description: '블로그 제목 작성',
    required: true,
  })
  @IsNotEmpty()
  @Column()
  title: string;

  @ApiProperty({
    example: '용도는 TIL이고',
    description: '블로그 내용 작성',
    required: true,
  })
  @IsNotEmpty()
  @Column()
  description: string;

  @ApiProperty({
    example: 1,
    description: '작성한 유저 Id',
    required: true,
  })
  @IsNotEmpty()
  @Column()
  userId: number;
}
