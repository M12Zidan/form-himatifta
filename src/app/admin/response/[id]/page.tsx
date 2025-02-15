"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { Loader2, Undo2 } from "lucide-react";
import Link from "next/link";

interface Question {
  id: string;
  question: string;
  type: string;
  answer_options: string[];
}

interface ResponseValue {
  id: string;
  answer: string;
}

interface ResponseData {
  response_id: string;
  owner_form: string;
  value: ResponseValue[];
}

export default function ViewResponses() {
  const { id } = useParams<{ id: string }>();
  const [responses, setResponses] = useState<ResponseData[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;
    const fetchResponses = async () => {
      try {
        const response = await axios.get(`/api/response/result/${id}`);
        setResponses(response.data.data);
        
        const formResponse = await axios.get(`/api/form/${id}`);
        setQuestions(formResponse.data.data.questions);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResponses();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
        <p className="ml-3 text-gray-600 text-lg">Memuat...</p>
      </div>
    );

  if (responses.length === 0)
    return (
      <div className="text-center text-red-600 font-semibold py-10">
        Tidak ada respons ditemukan.
        <Link href={`/admin/dashboard`} className="text-blue-600 hover:text-blue-800">
          Kembali
        </Link>
      </div>

    );

  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4 space-y-6">
      <Link href='/admin/dashboard'>
        <Undo2 />
      </Link>
      <Card>
        <CardHeader className="text-xl font-semibold">Daftar Respons</CardHeader>
        <CardContent>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                {questions.map((q) => (
                  <th key={q.id} className="border border-gray-300 p-2">{q.question}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {responses.map((response) => (
                <tr key={response.response_id} className="border border-gray-300">
                  {questions.map((q) => {
                    const answer = response.value.find((val) => val.id === q.id)?.answer || "-";
                    return <td key={q.id} className="border border-gray-300 p-2">{answer}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
