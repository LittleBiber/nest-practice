import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity({
  name: 'USER',
}) // 테이블이름을 지정할 수 있다
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    // API 속성 추가
    example: 'testemail@naver.com', // 예시
    description: '이메일 / ID 대신 사용', // 속성에 설명
    required: true, // 필수 값인지 여부
  })
  @IsEmail()
  @IsNotEmpty()
  @Column()
  email: string;

  @ApiProperty({
    example: 'Larry',
    description: '유저 이름',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  username: string;

  @ApiProperty({
    example: 'testPW',
    description: '비밀번호',
    required: true,
  })
  @Exclude() // 이거 왜 안되는지 천천히 다시 생각해보기...
  @Column()
  password: string;
}
