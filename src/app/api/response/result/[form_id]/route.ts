import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Sesuaikan dengan path Prisma client

// const reverseTypeQuestionMapping: Record<number, string> = {
//   1: "text",
//   2: "textarea",
//   3: "checkbox",
//   4: "multiple",
// };

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

    const responseAnswer = await prisma.response.findMany({
      where: { owner_form: form_id },
      include: {
        form_id: true,
      }
    });



    if (!responseAnswer) {
      return NextResponse.json(
        { message: "Form tidak ditemukan" },
        { status: 404 }
      );
    }

    const formattedResponse = responseAnswer.map(response => ({
      ...response,
      value: response.value.map((item: string) => JSON.parse(item))
    }));


    return NextResponse.json(
      {
        message: "Data Response berhasil diambil",
        data: formattedResponse,
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