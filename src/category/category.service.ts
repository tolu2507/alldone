import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<{ status: number; message: string }> {
    if (createCategoryDto) {
      const category = this.categoryRepository.create(createCategoryDto);
      await this.categoryRepository.save(category);
      return {
        status: HttpStatus.CREATED,
        message: 'Successfully added a new category',
      };
    } else {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'ensure the data you are sending is complete',
      };
    }
  }

  async findAll(): Promise<Category[]> {
    const response = await this.categoryRepository.find();
    console.log(response, '  response from the categories');
    return response;
  }
}
