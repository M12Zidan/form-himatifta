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
import { useState, useEffect } from "react";
import axios from "axios";

function Page() {
  const { id } = useParams();

  interface Form {
    form_id: string;
    nama_form: string;
    deskripsi: string;
    questions: {
      id: string;
      question: string;
      type: "multiple" | "checkbox" | "text" | "textarea";
      answer_options: string[];
    }[];
  }

  interface Answer {
    form_id: string;
    questions: { id: string; answer: string | string[] }[];
  }

  const [form, setForm] = useState<Form>({
    form_id: "",
    nama_form: "",
    deskripsi: "",
    questions: [],
  });

  const [answers, setAnswers] = useState<Answer>({
    form_id: id as string,
    questions: [],
  });

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`/api/form/${id}`);
        setForm(response.data.data);
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    fetchForm();
  }, [id]);

  const handleChange = (questionId: string, value: any) => {
    setAnswers((prev) => {
      const existingIndex = prev.questions.findIndex((q) => q.id === questionId);
      let updatedQuestions = [...prev.questions];

      if (existingIndex !== -1) {
        updatedQuestions[existingIndex] = { id: questionId, answer: value };
      } else {
        updatedQuestions.push({ id: questionId, answer: value });
      }

      return { ...prev, questions: updatedQuestions };
    });
  };

  const handleSubmit = async () => {
    // try {
    //   const response = await axios.post("/api/form/submit", answers);
    //   console.log("Jawaban berhasil dikirim:", response.data);
    // } catch (error) {
    //   console.error("Gagal mengirim jawaban:", error);
    // }
    console.log(answers);
  };

  return (
    <Child>
      <div className="w-full max-w-3xl mx-auto py-12 px-6">
        <Card className="shadow-lg rounded-xl border border-gray-200">
          <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-t-xl">
            <CardTitle className="text-xl font-bold">{form.nama_form}</CardTitle>
            <CardDescription className="text-gray-100">{form.deskripsi}</CardDescription>
          </CardHeader>
        </Card>

        <div className="mt-6 space-y-6">
          {form.questions.map((question) => (
            <Card key={question.id} className="border border-gray-200 shadow-md rounded-xl">
              <CardHeader className="bg-gray-50 p-4 rounded-t-xl border-b">
                <CardTitle className="text-lg font-semibold">{question.question}</CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                {question.type === "multiple" && (
                  <RadioGroup
                    onValueChange={(value) => handleChange(question.id, value)}
                    className="space-y-2"
                  >
                    {question.answer_options.map((option, index) => (
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
                    {question.answer_options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Checkbox
                          id={`checkbox-${question.id}-${index}`}
                          onCheckedChange={(checked) =>
                            handleChange(
                              question.id,
                              checked
                                ? [...(answers.questions.find(q => q.id === question.id)?.answer || []), option]
                                : answers.questions.find(q => q.id === question.id)?.answer.filter((v: string) => v !== option) || []
                            )
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
                    value={answers.questions.find(q => q.id === question.id)?.answer || ""}
                    onChange={(e) => handleChange(question.id, e.target.value)}
                  />
                )}

                {question.type === "textarea" && (
                  <Textarea
                    placeholder="Masukkan jawaban Anda..."
                    className="mt-2 w-full border-gray-300 focus:ring-green-500 focus:border-green-500"
                    value={answers.questions.find(q => q.id === question.id)?.answer || ""}
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
