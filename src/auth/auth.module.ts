import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MysqlModule } from '../connect/mysql.module';
import { MysqlService } from 'src/connect/mysql.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  imports: [ConfigModule, MysqlModule],
  providers: [MysqlService],
})
export class AuthModule {}
