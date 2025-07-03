import { Body, Controller, Post, Get, Param, Put, HttpCode, HttpStatus, Query, Delete, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NotFoundException } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: any) {
    const createUserDto = plainToInstance(CreateUserDto, body);
    const errors = await validate(createUserDto);
    if (errors.length > 0) {
      return { errors };
    }
    // Pass departmentId and roleId to the service
    return this.usersService.create({
      email: createUserDto.email,
      name: createUserDto.name,
      departmentId: createUserDto.departmentId,
      roleId: createUserDto.roleId,
    });
  }

  @Get(':role')
  async findOneByRole(@Param('role') role: string) {
    return  this.usersService.findOneByRoleId(role);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() body: any) {
    const updateUserDto = plainToInstance(CreateUserDto, body);
    const errors = await validate(updateUserDto);
    if (errors.length > 0) {
      return { errors };
    }
    const updated = await this.usersService.update(id, updateUserDto);
    if (!updated) {
      return { statusCode: HttpStatus.NOT_FOUND, message: 'User not found' };
    }
    return { statusCode: HttpStatus.OK, data: updated };
  }

  @Patch(':id/deactivate') // <-- ENSURE THIS LINE IS EXACTLY LIKE THIS
  @HttpCode(HttpStatus.OK) // Optional: Set HTTP status code for successful deactivation
  async deactivateUser(@Param('id') id: string) {
    const user = await this.usersService.deactivateUser(id);
    if (!user) { // Good practice: handle if service returns null/undefined (though service throws NotFoundException)
        throw new NotFoundException(`User with ID ${id} not found after deactivation attempt.`);
    }
    return user; // Cast to DTO if necessary
  }

  @Patch(':id/activate') 
  @HttpCode(HttpStatus.OK) 
  async activateUser(@Param('id') id: string) {
    const user = await this.usersService.activateUser(id);
    if (!user) { // Good practice: handle if service returns null/undefined (though service throws NotFoundException)
        throw new NotFoundException(`User with ID ${id} not found after activation attempt.`);
    }
    return user; // Cast to DTO if necessary
  }

  @Get()
  async findAll(
    @Query('departmentId') departmentId?: string,
    @Query('roleId') roleId?: string,
    @Query('companyId') companyId?: string,
    @Query('status') status?: string
  ) {
    const users = await this.usersService.findAll({ departmentId, roleId, companyId, status });
    // Do NOT override department/role with just the id, keep the full object
    return users;
  }


  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.usersService.remove(id);
    if (!deleted) {
      return { statusCode: HttpStatus.NOT_FOUND, message: 'User not found' };
    }
    return { statusCode: HttpStatus.OK, message: 'User deleted successfully' };
  }
}
