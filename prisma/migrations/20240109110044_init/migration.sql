/*
  Warnings:

  - Added the required column `quantity` to the `OrdersProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrdersProducts" ADD COLUMN     "quantity" INTEGER NOT NULL;
