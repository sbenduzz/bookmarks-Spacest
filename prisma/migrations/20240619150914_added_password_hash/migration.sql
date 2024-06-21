/*
  Warnings:

  - Added the required column `pswHash` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `pswHash` VARCHAR(191) NOT NULL;
