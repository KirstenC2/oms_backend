import { Test, TestingModule } from '@nestjs/testing';
import { LeaveRequestController } from './leave-request.controller';

describe('LeaveRequestController', () => {
  let controller: LeaveRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaveRequestController],
    }).compile();

    controller = module.get<LeaveRequestController>(LeaveRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
