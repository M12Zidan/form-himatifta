"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "next/navigation";

export default function ViewForm() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchForm = async () => {
      try {
        const response = await axios.get(`/api/form/${id}`);
        setForm(response.data.data);
      } catch (error) {
        console.error("Gagal mengambil data form:", error);
        setForm(null);
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!form) return <p>Form tidak ditemukan.</p>;

  return (
    <div className="w-full max-w-2xl mx-auto py-10 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{form.nama_form}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{form.deskripsi}</p>
        </CardContent>
      </Card>

      <div className="p-4 mt-4">
        {form.questions.map((q, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{q.question}</CardTitle>
              <span className="text-gray-600">Jenis: {q.type}</span>
            </CardHeader>
            <CardContent>
              {q.answer_options?.length > 0 && (
                <ul className="list-disc ml-5">
                  {q.answer_options.map((opt, idx) => (
                    <li key={idx}>{opt}</li>
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
