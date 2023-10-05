import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  BadGatewayException,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { LoginDto, LoginInsert } from './auth.dto';
import { MysqlService } from '../connect/mysql.service';
import * as bcrypt from 'bcrypt';
import { ok } from 'assert';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly mysqlService: MysqlService) {}

  @Post('login')
  @ApiResponse({ status: 200, description: 'Đăng nhập thành công.' })
  @ApiResponse({ status: 401, description: 'Đăng nhập không thành công.' })
  async login(@Body() loginData: LoginDto) {
    var paswordhash = await this.mysqlService.SelectPassWord(
      loginData.username,
    );
    bcrypt.compare(
      loginData.password,
      paswordhash['password'],
      (err, result) => {
        if (err) {
          throw new UnauthorizedException(
            'Đã có lỗi xảy khi trong quá trình xác',
          );
        } else if (result === true) {
          return 0;
        } else {
          return { message: 'Đăng nhập không thành công.' };
        }
      },
    );
  }

  @Post('register')
  async insertData(@Body() data: LoginInsert) {
    data.password = await bcrypt.hash(data.password, 10);
    try {
      var result = await this.mysqlService.insertData(data);
      return result;
    } catch (error) {
      throw error.message;
    }
  }
}
