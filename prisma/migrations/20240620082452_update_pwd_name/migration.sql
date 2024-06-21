/*
  Warnings:

  - You are about to drop the column `pswHash` on the `user` table. All the data in the column will be lost.
  - Added the required column `pwdHash` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `pswHash`,
    ADD COLUMN `pwdHash` VARCHAR(191) NOT NULL;
