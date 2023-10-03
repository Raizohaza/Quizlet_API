import { Injectable } from '@nestjs/common';
import { createConnection, Connection } from 'mysql2/promise';
import { LoginDto, LoginInsert } from '../auth/auth.dto';
@Injectable()
export class MysqlService {
  private connection: Connection;

  constructor() {
    this.initializeConnection();
  }

  async initializeConnection() {
    this.connection = await createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '@Ninh1209',
      database: 'qlqtpm',
    });
  }

  async insertData(data: LoginInsert) {
    try {
      var result = await this.connection.execute(
        'INSERT INTO user (username, password, full_name, email, date_of_birth, description, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [data.username, data.password, data.full_name, data.email, data.date_of_birth, data.description, data.status]
      );
    
      if (result) {
        return result;
      } else {
        throw new Error("Insertion failed");
      }
    } catch (error) {
      throw error.message;
    }
  }

  async SelectPassWord(username: string) {
    try {
      var result = await this.connection.execute(
        'SELECT password from user WHERE username = ?', [username]
      );
    
      if (result) {
        return result[0][0];
      } else {
        throw new Error("Select user failed");
      }
    } catch (error) {
      throw error.message;
    }
  }
}
