import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MysqlModule } from '../connect/mysql.module';
import { MysqlService } from 'src/connect/mysql.service';

@Module({
  controllers: [AuthController],
  imports: [MysqlModule],
  providers: [MysqlService],
})
export class AuthModule {}
