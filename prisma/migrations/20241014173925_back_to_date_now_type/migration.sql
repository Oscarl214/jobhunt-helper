/*
  Warnings:

  - You are about to alter the column `dateapplied` on the `application` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `application` MODIFY `dateapplied` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
