import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import {
  errorResponse,
  successResponse,
} from 'src/common/helpers/response.helper';
import { ApiResponse } from 'src/utils/interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<ApiResponse<any>> {
    if (createCategoryDto) {
      const category = this.categoryRepository.create(createCategoryDto);
      await this.categoryRepository.save(category);
      return successResponse(
        'Successfully added a new category',
        createCategoryDto,
      );
    } else {
      return errorResponse(
        'ensure the data you are sending is complete',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(): Promise<ApiResponse<Category[]>> {
    const response = await this.categoryRepository.find();
    console.log(response, '  response from the categories');
    return successResponse('Successfull', response);
  }
}
