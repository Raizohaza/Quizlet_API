import { Injectable } from '@nestjs/common';
import { createConnection, Connection } from 'mysql2/promise';
import { LoginDto, LoginInsert } from '../auth/auth.dto';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class MysqlService {
  private connection: Connection;

  constructor(private configService: ConfigService) {
    this.initializeConnection();
  }

  async initializeConnection() {
    this.connection = await createConnection({
      host: this.configService.get('DATABASE_HOST'),
      port: this.configService.get('DATABASE_PORT'),
      user: this.configService.get('DATABASE_USER'),
      password: this.configService.get('DATABASE_PASSWORD'),
      database: this.configService.get('DATABASE'),
      ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true,
      },
    });
  }

  async insertData(data: LoginInsert) {
    try {
      const result = await this.connection.execute(
        'INSERT INTO user (username, password, full_name, email, date_of_birth, description, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          data.username,
          data.password,
          data.full_name,
          data.email,
          data.date_of_birth,
          data.description,
          data.status,
        ],
      );

      if (result) {
        return result;
      } else {
        throw new Error('Insertion failed');
      }
    } catch (error) {
      throw error.message;
    }
  }

  async SelectPassWord(username: string) {
    try {
      const result = await this.connection.execute(
        'SELECT password from user WHERE username = ?',
        [username],
      );

      if (result) {
        return result[0][0];
      } else {
        throw new Error('Select user failed');
      }
    } catch (error) {
      throw error.message;
    }
  }
}
