import { Controller } from '@nestjs/common';
import { Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateProjectsDto } from './dto/create-projects.dto';

@Controller('projects')
export class ProjectsController {

    constructor(private readonly projectsService: ProjectsService) {}

    @Post()
    async createProject(@Body() body:any) {
        const createUserDto = plainToInstance(CreateProjectsDto, body);
        const errors = await validate(createUserDto);
        if (errors.length > 0) {
            return { errors };
        }
        return this.projectsService.createProject({
            name: createUserDto.name,
            description: createUserDto.description,
            status: createUserDto.status,
            startDate: createUserDto.startDate,
            endDate: createUserDto.endDate,
        });
    }
    @Get()
      findAll() {
        return this.projectsService.findAll();
      }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.projectsService.findOne(id);
    }   

    @Delete(':id')
    removeOne(@Param('id') id: string) {
        return this.projectsService.remove(id);
    }
}
