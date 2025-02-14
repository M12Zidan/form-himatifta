import { prisma } from "@/lib/prisma";
import { responseFormSchema } from "@/lib/validationSchemaApi";

export async function POST(request: Request) {
  try {
    const jsonData = await request.json();



    // Validasi data dengan Zod
    const result = responseFormSchema.safeParse(jsonData);
    if (!result.success) {  
      return Response.json(
        { message: "Validasi gagal!", errors: result.error.format() },
        { status: 400 }
      );
    }

    const { form_id, questions } = result.data;

    const existingForm = await prisma.form.findUnique({
      where: {
        form_id
      }
    })

    if(!existingForm){
      return Response.json(
        { message: "User Tidak ditemukan!" },
        { status: 400 }
      );
    }

    const answerConvert = JSON.stringify(questions);

    const answer: string[] = JSON.parse(answerConvert).map((q: string) => JSON.stringify(q));


    // // Buat form baru
    const responseAnswer = await prisma.response.create({
      data: {
        owner_form: form_id,
        value: answer,
      },
    });

    return Response.json(
      { message: "Form berhasil dibuat", responseAnswer },
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

export async function GET() {
  return Response.json({ message: "Hello, Next.js!" }, { status: 200 });
}