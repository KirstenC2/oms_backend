import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateIssueDto } from './dto/create-issue.dto';
import { NotFoundException } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Issue, IssueStatus } from '@prisma/client'; // Import Prisma's generated enum for issue status    

@Controller('issues')
export class IssuesController {
    constructor(private readonly issueService: IssuesService) {}

    @Get()
      findAll() {
        return this.issueService.findAll();
      }

    @Post()
    async createIssue(@Body() body: any) {
        const createUserDto = plainToInstance(CreateIssueDto, body);
        const errors = await validate(createUserDto);
        if (errors.length > 0) {
            return { errors };
        }
        return this.issueService.create({
            title: createUserDto.title,
            description: createUserDto.description,
            status: createUserDto.status,
            priority: createUserDto.priority,
            projectId: createUserDto.projectId, // Assuming you have a projectId in your DTO
        });
    }

    @Put(':issueId/status')
    async updateIssueStatus(@Param('issueId') id: string, @Body('newStatus') newStatus: IssueStatus){
      console.log(`Updating issue with ID ${id} to new status: ${newStatus}`);  
      const issue = await this.issueService.updateStatus(id, newStatus);
        if (!issue) {
            throw new NotFoundException(`Issue with ID ${id} not found`);
        }
        return issue;
    }
}
