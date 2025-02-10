import { prisma } from "@/lib/prisma";
import { formSchema } from "@/lib/validationSchemaApi";
export async function GET() {
  const data = await prisma.form.findMany({
    include: {
      user: {
        select: {
          user_id: true,
          nm_lengkap: true,
        },
      },
    },
  });

  const customResponse = data.map((form) => ({
    form_id: form.form_id,
    nama_form: form.nama_form,
    deskripsi: form.description_form,
    status: form.status,
    createdBy: {
      id: form.user.user_id,
      nama: form.user.nm_lengkap,
    },
  }));

  return Response.json(
    { message: "Data berhasil diambil", data: customResponse },
    {
      status: 200,
    }
  );
}

export async function POST(request: Request) {
  try {
    const jsonData = await request.json();

    // Validasi data dengan Zod
    const result = formSchema.safeParse(jsonData);
    if (!result.success) {
      return Response.json(
        { message: "Validasi gagal!", errors: result.error.format() },
        { status: 400 }
      );
    }

    const { user_id, nama_form, description_form, questions } = result.data;

    const status = result.data.status || false;

    const existingUser = await prisma.user.findUnique({
      where: {
        user_id
      }
    })

    if(!existingUser){
      return Response.json(
        { message: "User Tidak ditemukan!" },
        { status: 400 }
      );
    }

    // Buat form baru
    const form = await prisma.form.create({
      data: {
        createdBy:user_id,
        nama_form,
        description_form,
        status,
      },
    });

    if (questions && questions.length > 0) {
      await prisma.question.createMany({
        data: questions.map((q) => ({
          owner_form: form.form_id,
          question: q.question,
          type_question_id: q.type_question_id,
          answer_options: q.answer_options || [],
        })),
      });
    }

    return Response.json(
      { message: "Form berhasil dibuat", form },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saat membuat form:", error);
    return Response.json(
      { message: "Terjadi kesalahan saat membuat form" },
      { status: 500 }
    );
  }
}
