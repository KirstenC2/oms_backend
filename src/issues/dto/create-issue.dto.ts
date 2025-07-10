import { IsString, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { IssueStatus, IssuePriority } from '@prisma/client';

export class CreateIssueDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(IssueStatus)
  @IsOptional()
  status?: IssueStatus;

  @IsEnum(IssuePriority)
  @IsOptional()
  priority?: IssuePriority;

  @IsUUID()
  projectId: string;
}
