-- AlterTable
ALTER TABLE `projects` ADD COLUMN `clientId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
