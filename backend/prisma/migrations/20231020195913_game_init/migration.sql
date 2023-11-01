-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "move" TEXT[],

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);
