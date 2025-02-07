"use client";

import Child from "../../../page";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function Page() {
  const { id } = useParams();

  interface Form {
    id: number;
    name: string;
    description: string;
    questions: {
      id: number;
      text: string;
      type: "multiple" | "checkbox" | "text" | "textarea";
      options: string[];
    }[];
  }

  const form: Form = {
    id: 1,
    name: "Survey Kepuasan Mahasiswa",
    description: "Silakan isi formulir ini dengan jujur untuk meningkatkan kualitas layanan kami.",
    questions: [
      {
        id: 1,
        text: "Apakah Anda puas dengan pelayanan kampus?",
        type: "multiple",
        options: ["Sangat Puas", "Puas", "Biasa Saja", "Tidak Puas"],
      },
      {
        id: 2,
        text: "Apa saja fasilitas yang sering Anda gunakan?",
        type: "checkbox",
        options: ["Perpustakaan", "Laboratorium", "Kantin", "Ruang Diskusi"],
      },
      {
        id: 3,
        text: "Apa pendapat Anda tentang suasana belajar di kampus?",
        type: "text",
        options: [],
      },
      {
        id: 4,
        text: "Berikan saran untuk perbaikan kampus.",
        type: "textarea",
        options: [],
      },
    ],
  };

  const [answers, setAnswers] = useState<{ [key: number]: any }>({});

  const handleChange = (id: number, value: any) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    console.log("Jawaban yang dikirim:", answers);
  };

  return (
    <Child>
      <div className="w-full max-w-3xl mx-auto py-12 px-6">
        <Card className="shadow-lg rounded-xl border border-gray-200">
          <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-t-xl">
            <CardTitle className="text-xl font-bold">{form.name}</CardTitle>
            <CardDescription className="text-gray-100">{form.description}</CardDescription>
          </CardHeader>
        </Card>

        <div className="mt-6 space-y-6">
          {form.questions.map((question) => (
            <Card key={question.id} className="border border-gray-200 shadow-md rounded-xl">
              <CardHeader className="bg-gray-50 p-4 rounded-t-xl border-b">
                <CardTitle className="text-lg font-semibold">{question.text}</CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                {question.type === "multiple" && (
                  <RadioGroup
                    onValueChange={(value) => handleChange(question.id, value)}
                    className="space-y-2"
                  >
                    {question.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <RadioGroupItem value={option} id={`radio-${question.id}-${index}`} />
                        <Label htmlFor={`radio-${question.id}-${index}`} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {question.type === "checkbox" && (
                  <div className="space-y-2">
                    {question.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Checkbox
                          id={`checkbox-${question.id}-${index}`}
                          onCheckedChange={(checked) =>
                            handleChange(question.id, checked
                              ? [...(answers[question.id] || []), option]
                              : answers[question.id]?.filter((v: string) => v !== option))
                          }
                        />
                        <Label htmlFor={`checkbox-${question.id}-${index}`} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                )}

                {question.type === "text" && (
                  <Input
                    type="text"
                    placeholder="Masukkan jawaban Anda..."
                    className="mt-2 w-full border-gray-300 focus:ring-green-500 focus:border-green-500"
                    value={answers[question.id] || ""}
                    onChange={(e) => handleChange(question.id, e.target.value)}
                  />
                )}

                {question.type === "textarea" && (
                  <Textarea
                    placeholder="Masukkan jawaban Anda..."
                    className="mt-2 w-full border-gray-300 focus:ring-green-500 focus:border-green-500"
                    value={answers[question.id] || ""}
                    onChange={(e) => handleChange(question.id, e.target.value)}
                  />
                )}
              </CardContent>
            </Card>
          ))}

          <Button
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 transition-all text-white font-semibold text-lg py-3 rounded-xl shadow-md"
          >
            Kirim Jawaban
          </Button>
        </div>
      </div>
    </Child>
  );
}

export default Page;
