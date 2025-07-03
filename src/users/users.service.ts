import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { UserStatus } from '@prisma/client'; // Assuming you have an enum for user status

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
    return this.prisma.user.findMany({
      where,
      include: {
        department: true,
        role: true,
      },
    });
  }
  
  findOneByRoleId(roleId: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        role_id: roleId,
      },
      include: {
        department: true,
        role: true,
      },
    });
  }

  findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        department: true,
        role: true,
      },
    });
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

  remove(id: string): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }

  deactivateUser(id: string): Promise<User> {
    // Update the user's status to INACTIVE
    return this.prisma.user.update({
      where: { id },
      data: {
        status: UserStatus.INACTIVE, 
      },
    });
  }

  activateUser(id: string): Promise<User> {
    // Update the user's status to ACTIVE
    return this.prisma.user.update({
      where: { id },
      data: {
        status: UserStatus.ACTIVE, 
      },
    });
  }

  async updateUserStatus(id: string, newStatus: UserStatus): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    return this.prisma.user.update({
      where: { id },
      data: {
        status: newStatus,
      },
    });
  }
}
