-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "form";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "auth"."user" (
    "user_id" VARCHAR(255) NOT NULL DEFAULT public.uuid_generate_v4(),
    "nm_lengkap" VARCHAR(255),
    "password" VARCHAR(255),
    "email" VARCHAR(255),

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "form"."form" (
    "form_id" VARCHAR(255) NOT NULL DEFAULT public.uuid_generate_v4(),
    "user_id" TEXT NOT NULL,
    "nama_form" VARCHAR(255),
    "description_form" VARCHAR(255),
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "form_pkey" PRIMARY KEY ("form_id")
);

-- CreateTable
CREATE TABLE "form"."question" (
    "question_id" VARCHAR(255) NOT NULL,
    "form_id" TEXT NOT NULL,
    "question" VARCHAR(255),
    "type_question" INTEGER NOT NULL,
    "answer_options" TEXT[],

    CONSTRAINT "question_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "form"."type_question" (
    "id" SERIAL NOT NULL,
    "value" VARCHAR(255),

    CONSTRAINT "type_question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "form"."response" (
    "response_id" VARCHAR(255) NOT NULL DEFAULT public.uuid_generate_v4(),
    "question_id" TEXT NOT NULL,
    "type_question" INTEGER NOT NULL,
    "value" VARCHAR(255)[],

    CONSTRAINT "response_pkey" PRIMARY KEY ("response_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unique_users_cuid" ON "auth"."user"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "unique_form_cuid" ON "form"."form"("form_id");

-- CreateIndex
CREATE UNIQUE INDEX "unique_responsen_cuid" ON "form"."response"("response_id");

-- AddForeignKey
ALTER TABLE "form"."form" ADD CONSTRAINT "form_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."user"("user_id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "form"."question" ADD CONSTRAINT "question_type_question_fkey" FOREIGN KEY ("type_question") REFERENCES "form"."type_question"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "form"."response" ADD CONSTRAINT "response_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "form"."question"("question_id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "form"."response" ADD CONSTRAINT "response_type_question_fkey" FOREIGN KEY ("type_question") REFERENCES "form"."type_question"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
