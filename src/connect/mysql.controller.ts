import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { MysqlService } from './mysql.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Mysql')
@Controller('mysql')
export class MysqlController {
  constructor(private readonly mysqlService: MysqlService) {}

  @Post('insert')
  @ApiResponse({ status: 200, description: 'Đăng nhập thành công.' })
  @ApiResponse({ status: 401, description: 'Đăng nhập không thành công.' })
  async insertData(@Body() data: any) {
    try {
      const result = await this.mysqlService.insertData(data);
      return { message: 'Dữ liệu đã được chèn thành công' };
    } catch (error) {
      throw new InternalServerErrorException('Lỗi khi chèn dữ liệu vào MySQL');
    }
  }
}
