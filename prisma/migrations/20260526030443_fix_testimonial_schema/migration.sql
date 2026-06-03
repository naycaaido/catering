/*
  Warnings:

  - Added the required column `updated_at` to the `Testimonial` table without a default value. This is not possible if the table is not empty.
  - Made the column `subscriptionId` on table `Testimonial` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'COMPLETED';

-- DropForeignKey
ALTER TABLE "Testimonial" DROP CONSTRAINT "Testimonial_subscriptionId_fkey";

-- AlterTable
ALTER TABLE "Testimonial" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "subscriptionId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
