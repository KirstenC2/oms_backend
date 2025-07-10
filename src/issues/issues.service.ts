import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Issue } from '@prisma/client';
import { CreateIssueDto } from './dto/create-issue.dto';
import { IssueStatus, IssuePriority } from '@prisma/client'; // Assuming you have these

@Injectable()
export class IssuesService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createIssueDto: CreateIssueDto): Promise<Issue> {
        const { title, description, status, priority, projectId } = createIssueDto;

        const projectExists = await this.prisma.project.findUnique({
            where: { id: projectId },
        });
        if (!projectExists) {
            throw new Error('Project not found');
        }

        return this.prisma.issue.create({
            data: {
                title,
                description,
                status,
                priority,
                project: { connect: { id: projectId } },
            },
        });
    }

    async findAll(): Promise<Issue[]> {
        return this.prisma.issue.findMany({
            include: {
                project: true, // Include project details
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findById(issueId: string): Promise<Issue | null> {
        return this.prisma.issue.findUnique({
            where: { id: issueId },
            include: {
                project: true, // Include project details
            },
        });
    }
    async findByProjectId(projectId: string): Promise<Issue[]> {
        return this.prisma.issue.findMany({
            where: { projectId },
            include: {
                project: true, // Include project details
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async updateStatus(issueId: string, newStatus: IssueStatus): Promise<Issue | null> {
        return this.prisma.issue.update({
            where: { id: issueId },
            data: { status:newStatus },
            include: {
                project: true, // Include project details
            },
        });
    }

}
