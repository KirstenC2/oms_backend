/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `LeaveRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `LeaveRequest` DROP COLUMN `updatedAt`,
    ADD COLUMN `reviewedAt` DATETIME(3) NULL,
    ADD COLUMN `reviewedBy` VARCHAR(191) NULL,
    MODIFY `status` ENUM('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED') NOT NULL DEFAULT 'PENDING';
