// src/project/dto/create-project.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProjectStatus } from '@prisma/client'; // Import Prisma's generated enum

export class CreateProjectsDto {
  @ApiProperty({ description: 'The name of the project', example: 'New Feature Development' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'A brief description of the project', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'The start date of the project (YYYY-MM-DD)', example: '2025-08-01' })
  @IsDateString()
  @IsNotEmpty()
  startDate: string; // Use string for DTO, convert to Date object in service

  @ApiProperty({ description: 'The end date of the project (YYYY-MM-DD)', example: '2025-09-30' })
  @IsDateString()
  @IsNotEmpty()
  endDate: string; // Use string for DTO

  @ApiProperty({
    description: 'The initial status of the project',
    enum: ProjectStatus,
    default: ProjectStatus.NOT_STARTED,
    required: false,
  })
  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus; // Optional, default will be set by Prisma

  @ApiProperty({ description: 'The ID of the user managing this project', required: false })
  @IsString()
  @IsOptional()
  managerId?: string; // Optional, can be assigned later
}