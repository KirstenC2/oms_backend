import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LeaveStatus } from '@prisma/client';

@Injectable()
export class LeaveRequestService {
    constructor(private prisma: PrismaService) { }

    create(data: {
        employeeId: string;
        type: string;
        startDate: string; // 從前端接收字串
        endDate: string;
        reason?: string;
    }) {
        const start = new Date(data.startDate)
        const end = new Date(data.endDate)

        const durationHours = Math.abs((end.getTime() - start.getTime()) / 3600000)

        return this.prisma.leaveRequest.create({
            data: {
                employeeId: data.employeeId,
                type: data.type,
                reason: data.reason,
                startDate: start,
                endDate: end,
                // durationHours, // 若你有這個欄位
            },
        })
    }


    findAll() {
        return this.prisma.leaveRequest.findMany({
            include: { employee: true },
            orderBy: { createdAt: 'desc' },
        });
    }

    findByRequestId(requestId: string) {
        return this.prisma.leaveRequest.findUnique({
            where: { id: requestId },
            include: { employee: true },
        });
    }

    findByUser(userId: string) {
        return this.prisma.leaveRequest.findMany({
            where: { employeeId: userId },
            orderBy: { createdAt: 'desc' },
        });
    }

    approve(id: string, reviewerId: string) {
        return this.prisma.leaveRequest.update({
            where: { id },
            data: {
                status: LeaveStatus.APPROVED,
                reviewedBy: reviewerId,
                reviewedAt: new Date(),
            },
        });
    }

    reject(id: string, reviewerId: string) {
        return this.prisma.leaveRequest.update({
            where: { id },
            data: {
                status: LeaveStatus.REJECTED,
                reviewedBy: reviewerId,
                reviewedAt: new Date(),
            },
        });
    }

    cancel(id: string) { // The userId parameter is no longer needed
        return this.prisma.leaveRequest.updateMany({
            where: {
                id,
                status: LeaveStatus.PENDING, // Still good practice to only cancel pending requests
            },
            data: {
                status: LeaveStatus.CANCELLED,
            },
        });
    }
}
