import { v4 } from 'uuid';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate, IsJSON, IsNumber, IsString, IsUUID } from 'class-validator';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @BeforeInsert()
  generateUuid() {
    this.id = v4();
  }

  @Column()
  @IsString()
  todo: string;

  @Column()
  @IsString()
  description: string;

  @Column()
  @IsDate()
  date: Date;

  @Column()
  @IsNumber()
  priority: number;

  @Column('jsonb')
  @IsJSON()
  tags: { name: string; color: string };
}
