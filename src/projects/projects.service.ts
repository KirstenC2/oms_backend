import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NotFoundException } from '@nestjs/common';
import { CreateProjectsDto } from './dto/create-projects.dto';
import { Body } from '@nestjs/common';
import { TaskStatus } from '@prisma/client'; // Import Prisma's generated enum for task status
@Injectable()
export class ProjectsService {
    constructor(private readonly prisma: PrismaService) { }

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
                issues: true, // Include issues related to the project
                // client: true, // Include client details
            },
        });
    }
    findOne(id: string) {
        const project = this.prisma.project.findUnique({
            where: { id },
            include: {
                manager: true, // Include manager details
                tasks: true, // Include tasks related
                issues: true, // Include issues related
                client: true, // Include client details
                //  to the project
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

    findTasksByProjectId(id: string) {
        return this.prisma.task.findMany({
            where: { projectId: id },
            include: {
                assignedTo: true, // Include user 
                // details if assigned
            },
        });
    }
    

    async createTask(projectId: string, taskData: any) {
        const task = plainToInstance(CreateProjectsDto, taskData);
        return validate(task).then(errors => {
            if (errors.length > 0) {
                throw new Error('Validation failed');
            }
            return this.prisma.task.create({
                data: {
                    name: task.name,
                    description: task.description,
                    startDate: task.startDate,
                    endDate: task.endDate,
                    status: task.status,
                    projectId: projectId,
                },
            });
        });
    }

    async updateTaskStatus(taskId: string, status: string) {
        const task = await this.prisma.task.findUnique({
            where: { id: taskId },
        });
        if (!task) {
            throw new NotFoundException(`Task with ID ${taskId} not found`);
        }

        return this.prisma.task.update({
            where: { id: taskId },
            data: {
                status: status as TaskStatus,
            },
        });
    }
}
