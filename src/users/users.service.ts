import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

interface UserFilter {
  departmentId?: string;
  roleId?: string;
  companyId?: string;
  status?: string;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll(filter?: UserFilter): Promise<User[]> {
    const where: any = {};
    if (filter) {
      if (filter.departmentId) where.department_id = filter.departmentId;
      if (filter.roleId) where.role_id = filter.roleId;
      if (filter.companyId) where.company_id = filter.companyId;
      if (filter.status) where.status = filter.status;
    }
    return this.prisma.user.findMany({ where });
  }

  findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  create(data: { email: string; name: string; departmentId?: string; roleId?: string }): Promise<User> {
    const prismaData: any = {
      email: data.email,
      name: data.name,
    };
    if (data.departmentId) prismaData.department_id = data.departmentId;
    if (data.roleId) prismaData.role_id = data.roleId;
    return this.prisma.user.create({ data: prismaData });
  }

  update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  delete(id: string): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
