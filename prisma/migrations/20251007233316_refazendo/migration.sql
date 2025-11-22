/*
  Warnings:

  - You are about to drop the column `adress` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `timeZone` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "adress",
DROP COLUMN "timeZone",
ADD COLUMN     "address" TEXT DEFAULT '',
ADD COLUMN     "timezone" TEXT DEFAULT 'UTC';
