/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Reminder` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Reminder` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Reminder` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Reminder` table. All the data in the column will be lost.
  - Made the column `description` on table `Reminder` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Reminder" DROP COLUMN "createdAt",
DROP COLUMN "date",
DROP COLUMN "title",
DROP COLUMN "updatedAt",
ALTER COLUMN "description" SET NOT NULL;
