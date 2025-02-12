"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

export default function ViewForm() {

  interface Form {
    form_id: string;
    nama_form: string;
    deskripsi: string;
    status: boolean;
    questions: {
      id: string;
      question: string;
      type: "multiple" | "checkbox" | "text" | "textarea";
      answer_options: string[];
    }[]
  }

  const { id } = useParams();
  const [form, setForm] = useState<Form>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchForm = async () => {
      try {
        const response = await axios.get(`/api/form/${id}`);
        setForm(response.data.data);
      } catch (error) {
        console.error("Gagal mengambil data form:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
        <p className="ml-3 text-gray-600 text-lg">Memuat...</p>
      </div>
    );

  if (!form)
    return (
      <div className="text-center text-red-600 font-semibold py-10">
        Form tidak ditemukan.
      </div>
    );

  return (
    <div className="w-full max-w-2xl mx-auto py-10 px-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{form.nama_form}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">{form.deskripsi}</p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {form.questions.map((q, index) => (
          <Card key={index} className="border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-medium">{q.question}</CardTitle>
              <Badge variant="outline" className="text-xs text-gray-600 bg-gray-100">
                Jenis: {q.type}
              </Badge>
            </CardHeader>
            <CardContent>
              {q.answer_options?.length > 0 && (
                <ul className="list-disc ml-5 space-y-1 bg-gray-100 p-3 rounded-lg">
                  {q.answer_options.map((opt, idx) => (
                    <li key={idx} className="text-gray-800">
                      {opt}
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
