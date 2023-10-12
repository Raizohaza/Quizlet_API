import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const isExisted = await this.findOneByEmail(createUserDto.email);
    if(isExisted !== null){
      throw new BadRequestException("Email is already used!");
    }
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.status = 1;
    return await this.usersRepository.save(createUserDto);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id , status: 1});
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ email , status: 1});
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.update(id,{status:0});
  }
}
