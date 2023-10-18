import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
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