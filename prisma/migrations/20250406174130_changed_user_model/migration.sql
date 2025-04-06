/*
  Warnings:

  - You are about to drop the column `userName` on the `User` table. All the data in the column will be lost.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `User_userName_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `userName`,
    MODIFY `email` VARCHAR(191) NOT NULL;
