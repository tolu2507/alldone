import { v4 } from 'uuid';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @BeforeInsert()
  generateUuid() {
    this.id = v4();
  }

  @Column()
  todo: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column()
  priority: number;

  @Column('jsonb')
  tags: { name: string; color: string };
}
