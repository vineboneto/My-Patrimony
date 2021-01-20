-- CreateTable
CREATE TABLE "Patrimony"
(
  "id" SERIAL,
  "number" TEXT NOT NULL,
  "model" TEXT NOT NULL,
  "description" TEXT,
  "ownerId" INTEGER NOT NULL,
  "categoryId" INTEGER NOT NULL,

  PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ip"
(
  "id" SERIAL,
  "ip" TEXT NOT NULL,
  "mask" TEXT NOT NULL DEFAULT '255.255.255.0',
  "gateway" TEXT NOT NULL,
  "patrimonyId" INTEGER NOT NULL,

  PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Owner"
(
  "id" SERIAL,
  "name" TEXT NOT NULL,
  "sectorId" INTEGER NOT NULL,

  PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sector"
(
  "id" SERIAL,
  "name" TEXT NOT NULL,

  PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category"
(
  "id" SERIAL,
  "name" TEXT NOT NULL,

  PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Owner.sectorId_unique" ON "Owner"("sectorId");

-- CreateIndex
CREATE UNIQUE INDEX "Category.name_unique" ON "Category"("name");

-- AddForeignKey
ALTER TABLE "Patrimony" ADD FOREIGN KEY("ownerId")REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patrimony" ADD FOREIGN KEY("categoryId")REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ip" ADD FOREIGN KEY("patrimonyId")REFERENCES "Patrimony"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Owner" ADD FOREIGN KEY("sectorId")REFERENCES "Sector"("id") ON DELETE CASCADE ON UPDATE CASCADE;
