export class CreateTaskDto {
  todo: string;
  description: string;
  date: Date;
  priority: number;
  tags: { name: string; color: string };
}
