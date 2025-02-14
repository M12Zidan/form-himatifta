import { prisma } from "@/lib/prisma";
import { setStatusFormSchema } from "@/lib/validationSchemaApi";

export async function POST(request: Request) {
  try {
    const jsonData = await request.json();
    
    const result = setStatusFormSchema.safeParse(jsonData);
    if (!result.success) {  
      return Response.json(
        { message: "Validasi gagal!", errors: result.error.format() },
        { status: 400 }
      );
    }

    const { form_id } = result.data;

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



    const updateStatusForm = await prisma.form.update({
      where: {
        form_id
      },
      data: {
        status: !existingForm.status,
      }
    })

    return Response.json(
      { message: `Form Status berhasil diedit menjadi : ${updateStatusForm.status}` },
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