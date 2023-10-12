import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  full_name: string;

  @Column()
  password: string;

  @Column()
  date_of_birth: Date;

  @Column()
  description: string;

  @Column()
  status: number;
}