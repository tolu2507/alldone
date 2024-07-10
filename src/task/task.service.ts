import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<{
    status: number;
    message: string;
    data: CreateTaskDto;
  }> {
    console.log('datass ', createTaskDto);
    if (
      createTaskDto.date &&
      createTaskDto.description &&
      createTaskDto.priority &&
      createTaskDto.todo
    ) {
      try {
        const tasks: CreateTaskDto = this.taskRepository.create(createTaskDto);
        await this.taskRepository.save(tasks);
        return {
          status: HttpStatus.CREATED,
          message: 'Successfully created tasks.',
          data: tasks,
        };
      } catch (error) {
        return {
          status: error.code,
          message: error.message,
          data: null,
        };
      }
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Ensure all field are completetely filled',
        data: null,
      };
    }
  }

  async findAll(): Promise<{
    status: number;
    message: string;
    data: CreateTaskDto[];
  }> {
    try {
      const tasks: CreateTaskDto[] = await this.taskRepository.find();
      console.log(tasks);

      return {
        status: HttpStatus.FOUND,
        message: 'Successfully fetched all tasks',
        data: tasks,
      };
    } catch (error) {
      return {
        status: error.code,
        message: error.message,
        data: [],
      };
    }
  }

  async findOne(id: string): Promise<{
    status: number;
    message: string;
    data: CreateTaskDto;
  }> {
    try {
      const tasks: CreateTaskDto = await this.taskRepository.findOne({
        where: { id },
      });
      return {
        status: HttpStatus.FOUND,
        message: `Successfully gotten the task at id ${id}`,
        data: tasks,
      };
    } catch (error) {
      return {
        status: error.code,
        message: error.message,
        data: null,
      };
    }
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<{
    status: number;
    message: string;
  }> {
    if (updateTaskDto) {
      try {
        const task = await this.taskRepository.update(id, updateTaskDto);
        if (task) {
          return {
            status: HttpStatus.PARTIAL_CONTENT,
            message: 'Successfully update the task',
          };
        } else {
          return {
            status: HttpStatus.NOT_FOUND,
            message: 'Something went wrong while updating the task try again',
          };
        }
      } catch (error) {
        return {
          status: error.code,
          message: error.message,
        };
      }
    } else {
      return {
        status: HttpStatus.FORBIDDEN,
        message: 'enter complete data to update.',
      };
    }
  }

  async remove(id: string): Promise<{
    status: number;
    message: string;
  }> {
    const findTask = await this.taskRepository.findOneBy({ id });
    if (findTask) {
      await this.taskRepository.delete(id);
      return {
        status: HttpStatus.OK,
        message: 'Successfully deleted the task',
      };
    } else {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Couldnt find the task to be deleted',
      };
    }
  }
}
