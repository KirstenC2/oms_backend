import { Test, TestingModule } from '@nestjs/testing';
import { LeaveRequestService } from './leave-request.service';

describe('LeaveRequestService', () => {
  let service: LeaveRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeaveRequestService],
    }).compile();

    service = module.get<LeaveRequestService>(LeaveRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
