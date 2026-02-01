-- CreateEnum
CREATE TYPE "Category" AS ENUM ('ANIMAL', 'PLANTA');

-- CreateTable
CREATE TABLE "species" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "slug" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "species_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "species_slug_key" ON "species"("slug");
