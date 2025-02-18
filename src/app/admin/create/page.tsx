"use client";
import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Undo2 } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const [formName, setFormName] = useState("Untitled Form");
  const [description, setDescription] = useState("deskripsi");
  const [questions, setQuestions] = useState([
    {
      question: "Pertanyaan 1",
      type_question_id: "text",
      answer_options: [""],
    },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", type_question_id: "text", answer_options: [""] },
    ]);
  };

  const updateQuestion = (id: number, key: string, value: string | string[]) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, index) =>
        index === id ? { ...q, [key]: value } : q
      )
    );
  };

  const sendForm = async () => {
    const formData = {
      user_id: "38359f9b-efcb-4ea7-beaf-ef57106e3bfb",
      nama_form: formName,
      description_form: description,
      status: true,
      questions: questions.map((q) => ({
        question: q.question,
        type_question_id: q.type_question_id,
        answer_options: q.answer_options || [], 
      })),
    };
    console.log("Payload yang dikirim:", JSON.stringify(formData, null, 2));
    console.log(questions);

    try {
      const response = await axios.post("/api/form", formData);
      console.log("Data berhasil dikirim:", response.data.message);
      alert("Form berhasil dikirim!");
    } catch (error) {
      console.error("Gagal mengirim data:", error);
      alert("Gagal mengirim form");
    }
  };

  return (
      <div className="w-full max-w-2xl mx-auto py-10 space-y-6">
        <Link href='/admin/dashboard'>
          <Undo2 />
        </Link>
        <Card>
          <CardHeader>
            <Input
              className="text-2xl font-bold p-2 border border-gray-300"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="Masukkan nama form"
            />
          </CardHeader>
          <CardContent>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Masukkan deskripsi form..."
            />
          </CardContent>
        </Card>

        {/* Question List */}
        <div className="space-y-6">
          {questions.map((q, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>Pertanyaan {index + 1}</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  value={q.question}
                  onChange={(e) =>
                    updateQuestion(index, "question", e.target.value)
                  }
                  placeholder="Masukkan pertanyaan"
                />

                <Select
                  value={q.type_question_id}
                  onValueChange={(value) =>
                    updateQuestion(index, "type_question_id", value)
                  }
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Pilih tipe pertanyaan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Jawaban Singkat</SelectItem>
                    <SelectItem value="textarea">Paragraf</SelectItem>
                    <SelectItem value="multiple">Pilihan Ganda</SelectItem>
                    <SelectItem value="checkbox">Checkbox</SelectItem>
                  </SelectContent>
                </Select>

                <div className="mt-3">
                  {q.type_question_id === "text" && (
                    <Input placeholder="Jawaban singkat..." disabled />
                  )}
                  {q.type_question_id === "textarea" && (
                    <Textarea placeholder="Jawaban panjang..." disabled />
                  )}
                  {(q.type_question_id === "multiple" ||
                    q.type_question_id === "checkbox") && (
                    <div className="space-y-2">
                      {q.answer_options.map((opt, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          {q.type_question_id === "multiple" ? (
                            <input type="radio" disabled />
                          ) : (
                            <Checkbox disabled />
                          )}
                          <Input
                            value={opt}
                            onChange={(e) => {
                              const newOptions = [...q.answer_options];
                              newOptions[idx] = e.target.value;
                              updateQuestion(
                                index,
                                "answer_options",
                                newOptions
                              );
                            }}
                            placeholder="Opsi pilihan"
                          />
                        </div>
                      ))}
                      <Button
                        onClick={() =>
                          updateQuestion(index, "answer_options", [
                            ...q.answer_options,
                            "",
                          ])
                        }
                        variant="outline"
                        className="mt-2"
                      >
                        + Tambah Opsi
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex gap-4 justify-between">
          <Button
            onClick={addQuestion}
            className="w-1/4 bg-green-600 text-white"
          >
            + Tambah Pertanyaan
          </Button>
          <Button onClick={sendForm} className="w-1/4 bg-blue-500 text-white">
            Kirim
          </Button>
        </div>
      </div>
  );
}
