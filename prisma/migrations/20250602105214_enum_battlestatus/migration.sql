/*
  Warnings:

  - The values [ONGOING,COMPLETE] on the enum `BattleBetStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BattleBetStatus_new" AS ENUM ('WAITING', 'IN_PROGRESS', 'FINISHED');
ALTER TABLE "BattleBet" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "BattleBet" ALTER COLUMN "status" TYPE "BattleBetStatus_new" USING ("status"::text::"BattleBetStatus_new");
ALTER TYPE "BattleBetStatus" RENAME TO "BattleBetStatus_old";
ALTER TYPE "BattleBetStatus_new" RENAME TO "BattleBetStatus";
DROP TYPE "BattleBetStatus_old";
ALTER TABLE "BattleBet" ALTER COLUMN "status" SET DEFAULT 'WAITING';
COMMIT;
