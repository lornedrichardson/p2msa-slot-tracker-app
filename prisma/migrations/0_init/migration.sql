-- CreateTable
CREATE TABLE "Gamedata" (
    "session_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "casino" VARCHAR NOT NULL,
    "machine" VARCHAR NOT NULL,
    "session_start" TIMESTAMP(6) NOT NULL,
    "session_stop" TIMESTAMP(6) NOT NULL,
    "game_type" VARCHAR NOT NULL,
    "game" VARCHAR NOT NULL,
    "wageramt" MONEY NOT NULL,
    "wagernum" INTEGER,
    "win" MONEY,
    "loss" MONEY,
    "notes" TEXT,

    CONSTRAINT "gamedata_pk" PRIMARY KEY ("session_id")
);

-- CreateTable
CREATE TABLE "Userdata" (
    "user_id" SERIAL NOT NULL,
    "username" VARCHAR NOT NULL,
    "pw" VARCHAR NOT NULL,

    CONSTRAINT "userdata_pk" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "Gamedata" ADD CONSTRAINT "gamedata_fk" FOREIGN KEY ("user_id") REFERENCES "Userdata"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

