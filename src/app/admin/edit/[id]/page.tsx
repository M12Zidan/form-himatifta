"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader} from "@/components/ui/card";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Loader2, Undo2 } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    }[];
  }

  const { id } = useParams();
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);
  const [updateForm, setUpdateForm] = useState({
    user_id: "",
    nama_form: "",
    description_form: "",
    status: false,
    questions: [] as { question: string; type_question_id: string; answer_options: string[] }[],
  });
  
  useEffect(() => {
    if (!id) return;
    
    const fetchForm = async () => {
      try {
        const response = await axios.get(`/api/form/${id}`);
        setForm(response.data.data);
        setUpdateForm({
          user_id: "a25c81ac-a6b3-4d3b-a99f-1c649012531e",
          nama_form: response.data.data.nama_form,
          description_form: response.data.data.deskripsi,
          status: false,
          questions: response.data.data.questions.map((q: {question: string, type: string, answer_options: string[]}) => ({
            question: q.question,
            type_question_id: q.type,
            answer_options: q.answer_options,
          })),
        });
      } catch (error) {
        console.error("Gagal mengambil data form:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`/api/form/${id}`, updateForm);
      alert("Data berhasil diperbarui!");
    } catch (error) {
      console.log(error);
      alert("Gagal memperbarui data");
    }
  };

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
      <Link href='/admin/dashboard'>
        <Undo2 />
      </Link>
      <Card>
        <CardHeader>
          <Input
            value={updateForm.nama_form}
            onChange={(e) => setUpdateForm({ ...updateForm, nama_form: e.target.value })}
            className="text-xl font-semibold"
          />
        </CardHeader>
        <CardContent>
          <textarea
            value={updateForm.description_form}
            onChange={(e) => setUpdateForm({ ...updateForm, description_form: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </CardContent>
      </Card>

      <div className="space-y-4">
        {updateForm.questions.map((q, index) => (
          <Card key={index} className="border border-gray-200 shadow-sm">
            <CardHeader>
              <Input
                value={q.question}
                onChange={(e) => {
                  const newQuestions = [...updateForm.questions];
                  newQuestions[index].question = e.target.value;
                  setUpdateForm({ ...updateForm, questions: newQuestions });
                }}
                className="text-lg font-medium"
              />
              <Badge variant="outline" className="text-xs text-white w-fit bg-fuchsia-500">
                Jenis: {q.type_question_id}
              </Badge>
            </CardHeader>
            <CardContent>
              {q.answer_options?.length > 0 && (
                <ul className="list-disc ml-5 space-y-1 p-3 rounded-lg">
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

      <Button onClick={handleUpdate} className="w-full bg-green-600 hover:bg-green-700 text-white">
        Simpan Perubahan
      </Button>
    </div>
  );
}