/*
  Warnings:

  - The values [basic,professional] on the enum `plan` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `striper_customer_id` on the `User` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "plan_new" AS ENUM ('BASIC', 'PROFESSIONAL');
ALTER TABLE "Subscription" ALTER COLUMN "plan" TYPE "plan_new" USING ("plan"::text::"plan_new");
ALTER TYPE "plan" RENAME TO "plan_old";
ALTER TYPE "plan_new" RENAME TO "plan";
DROP TYPE "plan_old";
COMMIT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "striper_customer_id",
ADD COLUMN     "stripe_customer_id" TEXT DEFAULT '';
