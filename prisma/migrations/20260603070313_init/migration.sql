-- CreateTable
CREATE TABLE "RevokeTokens" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "RevokeTokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RevokeTokens_token_key" ON "RevokeTokens"("token");
