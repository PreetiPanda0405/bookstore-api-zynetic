import {
    IsString,
    IsNumber,
    IsOptional,
    IsDateString,
    Min,
    Max,
  } from 'class-validator';
  import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
  
  export class CreateBookDto {
    @ApiProperty({ example: 'Atomic Habits' })
    @IsString()
    title: string;
  
    @ApiProperty({ example: 'James Clear' })
    @IsString()
    author: string;
  
    @ApiPropertyOptional({ example: 'Self-help' })
    @IsOptional()
    @IsString()
    category?: string;
  
    @ApiPropertyOptional({ example: 499 })
    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number;
  
    @ApiPropertyOptional({ example: 4.5, minimum: 0, maximum: 5 })
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(5)
    rating?: number;
  
    @ApiPropertyOptional({ example: '2018-10-16' })
    @IsOptional()
    @IsDateString()
    publishedDate?: Date;
  }
  