-- noinspection SqlResolveForFile

/*
  Warnings:

  - You are about to drop the column `privince` on the `Contact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "privince",
ADD COLUMN     "province" TEXT;
