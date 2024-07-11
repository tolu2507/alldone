import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import {
  errorResponse,
  successResponse,
} from 'src/common/helpers/response.helper';
import { ApiResponse } from 'src/utils/interface';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async create(
    createTaskDto: CreateTaskDto,
  ): Promise<ApiResponse<CreateTaskDto>> {
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

        return successResponse('Successfully created tasks.', tasks);
      } catch (error) {
        return errorResponse(error.message, error);
      }
    } else {
      return errorResponse(
        'Ensure all field are completetely filled',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<ApiResponse<CreateTaskDto[]>> {
    try {
      const tasks: CreateTaskDto[] = await this.taskRepository.find();
      console.log(tasks);

      return successResponse('Successfully fetched all tasks.', tasks);
    } catch (error) {
      return errorResponse(error.message, error);
    }
  }

  async findOne(id: string): Promise<ApiResponse<CreateTaskDto>> {
    try {
      const tasks: CreateTaskDto = await this.taskRepository.findOne({
        where: { id },
      });
      return successResponse(`Successfully gotten the task at id ${id}`, tasks);
    } catch (error) {
      return errorResponse(error.message, error);
    }
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<ApiResponse<UpdateTaskDto>> {
    if (updateTaskDto) {
      try {
        const task = await this.taskRepository.update(id, updateTaskDto);
        if (task) {
          return successResponse('Successfully updated tasks.', updateTaskDto);
        } else {
          return errorResponse(
            'Something went wrong while updating the task try again',
            'error',
          );
        }
      } catch (error) {
        return errorResponse(error.message, error);
      }
    } else {
      return errorResponse(
        'enter complete data to update.',
        'error getting complete data',
      );
    }
  }

  async remove(id: string): Promise<ApiResponse<string>> {
    const findTask = await this.taskRepository.findOneBy({ id });
    if (findTask) {
      await this.taskRepository.delete(id);
      return successResponse('Successfully deleted the task', findTask.id);
    } else {
      return errorResponse(
        'Couldnt find the task to be deleted',
        'could not find the data',
      );
    }
  }
}
