import {
    Injectable,
    NotFoundException,
    BadRequestException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model, isValidObjectId } from 'mongoose';
  import { Book } from './schemas/book.schema';
  import { CreateBookDto } from './dto/create-book.dto';
  
  @Injectable()
  export class BooksService {
    constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}
  
    async create(createBookDto: CreateBookDto) {
      try {
        const book = new this.bookModel(createBookDto);
        return await book.save();
      } catch (error) {
        throw new BadRequestException('Invalid book data');
      }
    }
  
    async findAll(query: any) {
        try {
          const filter: any = {};
      
          // 🔍 Filtering
          if (query.author) {
            filter.author = { $regex: query.author, $options: 'i' };
          }
          if (query.category) {
            filter.category = { $regex: query.category, $options: 'i' };
          }
          if (query.rating) {
            filter.rating = Number(query.rating);
          }
          if (query.search) {
            filter.title = { $regex: query.search, $options: 'i' };
          }
      
          // 📄 Pagination
          const page = parseInt(query.page) || 1;
          const limit = parseInt(query.limit) || 10;
          const skip = (page - 1) * limit;
      
          //  Sorting
          
    const sortBy = query.sortBy || 'title'; // e.g. title, price, rating
    const order = query.order === 'desc' ? -1 : 1;
    const sort: Record<string, 1 | -1> = { [sortBy]: order };

      
          // 🧾 Final Query
          return await this.bookModel
            .find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .exec();
        } catch (error) {
          console.error('Error in findAll:', error);
          throw new BadRequestException('Invalid query');
        }
      }
      
    async findOne(id: string) {
      if (!isValidObjectId(id)) {
        throw new BadRequestException('Invalid book ID');
      }
  
      const book = await this.bookModel.findById(id).exec();
  
      if (!book) {
        throw new NotFoundException('Book not found');
      }
  
      return book;
    }
  
    async update(id: string, dto: Partial<CreateBookDto>) {
      if (!isValidObjectId(id)) {
        throw new BadRequestException('Invalid book ID');
      }
  
      const updated = await this.bookModel.findByIdAndUpdate(id, dto, {
        new: true,
      });
  
      if (!updated) {
        throw new NotFoundException('Book not found');
      }
  
      return updated;
    }
  
    async remove(id: string) {
      if (!isValidObjectId(id)) {
        throw new BadRequestException('Invalid book ID');
      }
  
      const deleted = await this.bookModel.findByIdAndDelete(id);
  
      if (!deleted) {
        throw new NotFoundException('Book not found');
      }
  
      return deleted;
    }
  }
  