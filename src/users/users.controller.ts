import { Controller, Post, Body, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDTO } from './dto/signup.dto';
import { SignInDTO } from './dto/siginin.dto';
import { Response } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
  })
  @ApiResponse({
    status: 401,
    description: '이미 같은 이메일로 가입됨',
  })
  @ApiResponse({
    // 응답 설정
    status: 500, // HTTP 코드
    description: '서버 에러',
  })
  @ApiOperation({ summary: '회원가입' }) // API의 기능 설명 추가
  @Post('signup')
  signUp(@Body() signUpDTO: SignUpDTO) {
    return this.usersService.signUp(signUpDTO);
  }

  @ApiResponse({
    status: 200,
    description: '로그인 성공',
  })
  @ApiResponse({
    status: 401,
    description: 'ID/PW입력이 잘못됨',
  })
  @ApiResponse({
    status: 500,
    description: '서버 에러',
  })
  @ApiOperation({ summary: '로그인' })
  @Post('signin')
  async signIn(
    @Body() signInDTO: SignInDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { jwt, user } = await this.usersService.signIn(signInDTO);
    response.cookie('jwt', jwt, {
      httpOnly: true,
    }); // httpOnly 반드시 넣어야 함
    return user;
  }

  @ApiResponse({
    status: 200,
    description: '로그아웃 성공',
  })
  @ApiResponse({
    status: 500,
    description: '서버 에러',
  })
  @ApiOperation({ summary: '로그아웃' })
  @Post('signout')
  async signOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
  }
}
