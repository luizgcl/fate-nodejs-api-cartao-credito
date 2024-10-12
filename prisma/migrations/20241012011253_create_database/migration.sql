-- CreateTable
CREATE TABLE "users" (
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cep" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("cpf")
);

-- CreateTable
CREATE TABLE "user_cards" (
    "id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "month_expires" INTEGER NOT NULL,
    "year_expires" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,

    CONSTRAINT "user_cards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "user_cards" ADD CONSTRAINT "user_cards_cpf_fkey" FOREIGN KEY ("cpf") REFERENCES "users"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;
