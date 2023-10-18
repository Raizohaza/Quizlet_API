import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './dto/login.dto';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';
@ApiTags('Auth')
@ApiBearerAuth()
@UseInterceptors(new ResponseInterceptor())
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private userService: UsersService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginDTO) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }
}
