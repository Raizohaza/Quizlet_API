import { Module } from '@nestjs/common';
import { MysqlController } from './mysql.controller';
import { MysqlService } from './mysql.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [MysqlController],
  providers: [MysqlService],
})
export class MysqlModule {}
