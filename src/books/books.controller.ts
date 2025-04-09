import {
    Query,
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    UseGuards,
  } from '@nestjs/common';
  import { BooksService } from './books.service';
  import { AuthGuard } from '@nestjs/passport';
  import { CreateBookDto } from './dto/create-book.dto';
  
  @UseGuards(AuthGuard('jwt')) // 🔐 Protect all routes with JWT
  @Controller('books')
  export class BooksController {
    constructor(private booksService: BooksService) {}
  
    // ✅ Create a new book
    @Post()
    create(@Body() dto: CreateBookDto) {
      return this.booksService.create(dto);
    }
  
    // ✅ Get all books
    @Get()
    findAll(@Query() query: any) {
      return this.booksService.findAll(query);
    }
    @Get('debug') // <-- This goes first
   debug(@Query() query: any) {
  return this.booksService.findAll(query);
}
  
    // ✅ Get a book by ID
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.booksService.findOne(id);
    }
  
    // ✅ Update a book by ID
    @Put(':id')
    update(@Param('id') id: string, @Body() dto: Partial<CreateBookDto>) {
      return this.booksService.update(id, dto);
    }
  
    // ✅ Delete a book by ID
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.booksService.remove(id);
    }
    

  }
  