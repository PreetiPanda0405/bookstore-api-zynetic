import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-bookstore'), // or your MongoDB Atlas URL
    AuthModule,
    UsersModule,
    BooksModule,
  ],
})
export class AppModule {}
