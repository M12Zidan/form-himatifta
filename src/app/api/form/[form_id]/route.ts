import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Sesuaikan dengan path Prisma client
import { updateFormSchema } from "@/lib/validationSchemaApi";

const reverseTypeQuestionMapping: Record<number, string> = {
  1: "text",
  2: "textarea",
  3: "checkbox",
  4: "multiple",
};

// **GET: Ambil data form dan pertanyaan**
export async function GET(
  request: NextRequest,
  { params }: { params: { form_id: string } }
) {
  try {
    if (!params || !params.form_id) {
      return NextResponse.json(
        { message: "Parameter form_id tidak ditemukan" },
        { status: 400 }
      );
    }

    const { form_id } = params;

    const form = await prisma.form.findUnique({
      where: { form_id },
      include: {
        user: { select: { nm_lengkap: true } },
      },
    });

    if (!form) {
      return NextResponse.json(
        { message: "Form tidak ditemukan" },
        { status: 404 }
      );
    }

    const questions = await prisma.question.findMany({
      where: { owner_form: form_id },
    });

    const customQuestions = questions.map((q) => ({
      id: q.question_id,
      question: q.question ?? "", // Pastikan tidak null
      type: reverseTypeQuestionMapping[q.type_question_id] || "unknown",
      answer_options: q.answer_options || [],
    }));

    return NextResponse.json(
      {
        message: "Data berhasil diambil",
        data: {
          form_id: form.form_id,
          nama_form: form.nama_form,
          deskripsi: form.description_form,
          status: form.status,
          createdBy: { nama: form.user.nm_lengkap },
          questions: customQuestions,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error mengambil data form:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

// **PUT: Update form dan pertanyaan dengan upsert**
export async function PUT(
  request: NextRequest,
  { params }: { params: { form_id: string } }
) {
  try {
    if (!params || !params.form_id) {
      return NextResponse.json(
        { message: "form_id tidak ditemukan" },
        { status: 400 }
      );
    }

    const form_id = params.form_id;
    const body = await request.json();
    const validation = updateFormSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: "Input tidak valid", errors: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { nama_form, deskripsi, status, questions } = validation.data;

    // Periksa apakah form ada
    const form = await prisma.form.findUnique({ where: { form_id } });

    if (!form) {
      return NextResponse.json(
        { message: "Form tidak ditemukan" },
        { status: 404 }
      );
    }

    // **1. Hapus semua pertanyaan lama yang terkait dengan form_id**
    await prisma.question.deleteMany({
      where: { owner_form: form_id },
    });

    // **2. Update form**
    const updatedForm = await prisma.form.update({
      where: { form_id },
      data: {
        ...(nama_form && { nama_form }),
        ...(deskripsi && { description_form: deskripsi }),
        ...(status !== undefined && { status }),
      },
    });

    // **3. Tambahkan pertanyaan baru**
    if (questions && questions.length > 0) {
      await prisma.question.createMany({
        data: questions.map((q) => ({
          owner_form: form_id,
          question: q.question,
          type_question_id: q.type_question_id,
          answer_options: q.answer_options || [],
        })),
      });
    }

    return NextResponse.json(
      {
        message: "Form dan pertanyaan berhasil diperbarui",
        data: {
          form_id: updatedForm.form_id,
          nama_form: updatedForm.nama_form,
          deskripsi: updatedForm.description_form,
          status: updatedForm.status,
          questions: questions, // Langsung kirim kembali data baru yang dikirim user
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error saat memperbarui form:", error);

    return NextResponse.json(
      {
        message: "Terjadi kesalahan server",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
