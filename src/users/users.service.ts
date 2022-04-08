import { JwtService } from '@nestjs/jwt';
import { UserEntity } from './entities/user.entity';
import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { SignUpDTO } from './dto/signup.dto';
import { SignInDTO } from './dto/siginin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDTO: SignUpDTO) {
    const { email, password } = signUpDTO;
    const user = await this.userRepository.findOne({ email });

    const salt = await bcrypt.genSalt();
    const hashedPW = await bcrypt.hash(password, salt);

    if (user) throw new UnauthorizedException('이미 가입한 이메일입니다');

    await this.userRepository.save({
      ...signUpDTO,
      password: hashedPW,
    });

    return email;
  }

  async signIn(signInDTO: SignInDTO) {
    const { email, password } = signInDTO;

    const found = await this.userRepository.findOne({ email });

    if (!found) throw new NotFoundException('가입되지 않은 이메일입니다');

    if (!(await bcrypt.compare(password, found.password)))
      throw new UnauthorizedException('비밀번호를 확인하세요');

    const username = found.username;
    const user = { email, username };

    try {
      const jwt = this.jwtService.sign({ email });
      return { jwt, user };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findUserById(id: string) {
    const found = await this.userRepository.findOne(id);

    if (!found) return null;
    return found;
  }
}
