import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NotFoundException } from '@nestjs/common';
import { CreateProjectsDto } from './dto/create-projects.dto';
import { Body } from '@nestjs/common';
@Injectable()
export class ProjectsService {
    constructor(private readonly prisma: PrismaService) {}
    
    createProject(@Body() createProjectsDto: CreateProjectsDto) {
        const projectData = plainToInstance(CreateProjectsDto, createProjectsDto);
        return validate(projectData).then(errors => {
            if (errors.length > 0) {
                throw new Error('Validation failed');
            }
            return this.prisma.project.create({
                data: {
                    name: projectData.name,
                    description: projectData.description,
                    status: projectData.status,
                    startDate: projectData.startDate,
                    endDate: projectData.endDate,
                },
            });
        });
    }
    findAll() {
        return this.prisma.project.findMany({
            include: {
                manager: true, // Include manager details
                tasks: true, // Include tasks related to the project
            },
        });
    }
    findOne(id: string) {
        const project = this.prisma.project.findUnique({
            where: { id },
            include: {
                manager: true, // Include manager details
                tasks: true, // Include tasks related to the project
            },
        });
        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }
        return project;
    }
    update(id: string, updateProjectDto: CreateProjectsDto) {   
        const projectData = plainToInstance(CreateProjectsDto, updateProjectDto);
        return validate(projectData).then(errors => {
            if (errors.length > 0) {
                throw new Error('Validation failed');
            }
            return this.prisma.project.update({
                where: { id },
                data: {
                    name: projectData.name,
                    description: projectData.description,
                    status: projectData.status,
                    startDate: projectData.startDate,
                    endDate: projectData.endDate,
                },
            });
        });
    }
    remove(id: string) {
        const project = this.prisma.project.delete({
            where: { id },
        });
        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }
        return project;
    }
}
