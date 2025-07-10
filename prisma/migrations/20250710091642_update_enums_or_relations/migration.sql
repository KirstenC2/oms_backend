/*
  Warnings:

  - You are about to drop the `issues` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `issues` DROP FOREIGN KEY `issues_assigneeId_fkey`;

-- DropForeignKey
ALTER TABLE `issues` DROP FOREIGN KEY `issues_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `issues` DROP FOREIGN KEY `issues_reporterId_fkey`;

-- DropTable
DROP TABLE `issues`;
