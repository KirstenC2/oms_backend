import { IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator'

export class CreateLeaveRequestDto {
  @IsNotEmpty()
  @IsString()
  employeeId: string

  @IsNotEmpty()
  @IsString()
  type: string

  @IsNotEmpty()
  @IsDateString()
  startDate: string

  @IsNotEmpty()
  @IsDateString()
  endDate: string

  @IsOptional()
  @IsString()
  reason?: string
}
