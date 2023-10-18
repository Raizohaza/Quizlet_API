import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        example: 'username'
    })
    username: string;
  
    @ApiProperty({
        example: '123'
    })
    password: string;
  
    @ApiProperty({
        example: "user's full name"
    })
    full_name: string;
  
    @ApiProperty({
        example: 'email@gmail.com'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: '2023-1-1'
    })
    @Type(() => Date)
    @IsDate()
    date_of_birth: Date= new Date;
  
    @ApiProperty({
        required:false,
        default:''
    })
    description: string;

    @ApiHideProperty()
    status: number = 1;
}
