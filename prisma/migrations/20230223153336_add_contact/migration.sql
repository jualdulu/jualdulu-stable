-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "facebook" TEXT,
    "address" TEXT,
    "privince" TEXT,
    "city" TEXT,
    "district" TEXT,
    "postalCode" TEXT,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);
