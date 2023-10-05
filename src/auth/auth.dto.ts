import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class LoginInsert{
    @ApiProperty()
    username: string;
  
    @ApiProperty()
    password: string;

    @ApiProperty()
    full_name: string;
  
    @ApiProperty()
    email: string;
    @ApiProperty()
    date_of_birth: Date;
  
    @ApiProperty()
    description: string;

    @ApiProperty()
    status: number;
  }