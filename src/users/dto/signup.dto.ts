import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from '../entities/user.entity';

export class SignUpDTO extends PickType(UserEntity, ['email'] as const) {
  @IsString()
  @IsNotEmpty()
  password: string;
}
