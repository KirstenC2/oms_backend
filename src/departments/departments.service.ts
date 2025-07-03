// src/departments/departments.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Department } from '@prisma/client'; // Import Prisma's generated Department type

// SOLUTION: Export these interfaces so they can be named in the generated .d.ts file
export interface ManagerInfo { // <-- ADD 'export'
  id: string;
  name: string;
  email: string;
}

// SOLUTION: Export this type alias so it can be named
export type DepartmentWithMetrics = Department & { // <-- ADD 'export'
  userCount: number;
  manager?: ManagerInfo | null;
};

@Injectable()
export class DepartmentsService {
  constructor(private readonly prisma: PrismaService) {}

  create(name: string) {
    return this.prisma.department.create({ data: { name } });
  }

  async findAll(): Promise<DepartmentWithMetrics[]> {
    const departments = await this.prisma.department.findMany({
      include: {
        users: {
          include: {
            role: true,
          },
        },
      },
    });

    return departments.map(dept => {
      const userCount = dept.users.length;
      const managerUser = dept.users.find(user => user.role?.name === 'Manager');

      const manager: ManagerInfo | null = managerUser
        ? {
            id: managerUser.id,
            name: managerUser.name,
            email: managerUser.email,
          }
        : null;

      const { users, ...rest } = dept;

      return {
        ...rest,
        userCount,
        manager,
      };
    });
  }

  async findOne(id: string): Promise<DepartmentWithMetrics> {
    const department = await this.prisma.department.findUnique({
      where: { id },
      include: {
        users: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found.`);
    }

    const userCount = department.users.length;
    const managerUser = department.users.find(user => user.role?.name === 'Manager');

    const manager: ManagerInfo | null = managerUser
      ? {
          id: managerUser.id,
          name: managerUser.name,
          email: managerUser.email,
        }
      : null;

    const { users, ...rest } = department;

    return {
      ...rest,
      userCount,
      manager,
    };
  }

  remove(id: string) {
    return this.prisma.department.delete({ where: { id } });
  }
}