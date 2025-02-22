"use client";

import { useParams, useRouter } from "next/navigation";
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
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Undo2 } from "lucide-react";
import Link from "next/link";

function Page() {
  const { id } = useParams();
  const router = useRouter();
  const questionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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
    questions: { id: string; answer: string }[];
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

  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (questionId: string, value: string) => {
    setAnswers((prev) => {
      const existingIndex = prev.questions.findIndex(
        (q) => q.id === questionId
      );
      const updatedQuestions = [...prev.questions];

      if (existingIndex !== -1) {
        updatedQuestions[existingIndex] = { id: questionId, answer: value };
      } else {
        updatedQuestions.push({ id: questionId, answer: value });
      }

      return { ...prev, questions: updatedQuestions };
    });

    setErrors((prev) => ({ ...prev, [questionId]: false }));
  };

  const handleCheckboxChange = (
    questionId: string,
    value: string,
    checked: boolean
  ) => {
    setAnswers((prev) => {
      const existingIndex = prev.questions.findIndex(
        (q) => q.id === questionId
      );
      const updatedQuestions = [...prev.questions];

      if (existingIndex !== -1) {
        let currentAnswers = updatedQuestions[existingIndex].answer
          ? updatedQuestions[existingIndex].answer.split(",")
          : [];

        if (checked) {
          currentAnswers.push(value);
        } else {
          currentAnswers = currentAnswers.filter((ans) => ans !== value);
        }

        updatedQuestions[existingIndex] = {
          id: questionId,
          answer: currentAnswers.join(","),
        };
      } else {
        updatedQuestions.push({ id: questionId, answer: value });
      }

      return { ...prev, questions: updatedQuestions };
    });

    setErrors((prev) => ({ ...prev, [questionId]: false }));
  };

  const validateAnswers = () => {
    const newErrors: { [key: string]: boolean } = {};
    form.questions.forEach((q) => {
      const answer =
        answers.questions.find((ans) => ans.id === q.id)?.answer || "";
      if (!answer.trim()) {
        newErrors[q.id] = true;
      }
    });
    setErrors(newErrors);

    // Scroll ke pertanyaan pertama yang error
    const firstErrorKey = Object.keys(newErrors)[0];
    if (firstErrorKey && questionRefs.current[firstErrorKey]) {
      questionRefs.current[firstErrorKey]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateAnswers()) return;

    setIsSubmitting(true);
    try {
      await axios.post("/api/response/submit", answers);
      router.push("/form"); // Redirect setelah submit sukses
    } catch (error) {
      console.error("Gagal mengirim jawaban:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Link href="/form">
        <Undo2 />
      </Link>
      <div className="w-full max-w-3xl mx-auto py-6 px-6">
        <Card className="shadow-lg rounded-xl border border-gray-200">
          <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-t-xl">
            <CardTitle className="text-xl font-bold">
              {form.nama_form}
            </CardTitle>
            <CardDescription className="text-gray-100">
              {form.deskripsi}
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="mt-6 space-y-6">
          {form.questions.map((question) => (
            <Card
              key={question.id}
              className="border border-gray-200 shadow-md rounded-xl"
            >
              <CardHeader className="bg-gray-50 p-4 rounded-t-xl border-b">
                <CardTitle className="text-lg font-semibold">
                  {question.question}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                {question.type === "multiple" && (
                  <RadioGroup
                    onValueChange={(value) => handleChange(question.id, value)}
                    className="space-y-2"
                  >
                    {question.answer_options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <RadioGroupItem value={option} />
                        <Label className="cursor-pointer">{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {question.type === "checkbox" && (
                  <div className="space-y-2">
                    {question.answer_options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Checkbox
                          checked={answers.questions
                            .find((q) => q.id === question.id)
                            ?.answer?.split(",")
                            .includes(option)}
                          onCheckedChange={(checked: boolean) =>
                            handleCheckboxChange(question.id, option, checked)
                          }
                        />
                        <Label className="cursor-pointer">{option}</Label>
                      </div>
                    ))}
                  </div>
                )}

                {question.type === "text" && (
                  <Input
                    type="text"
                    maxLength={100}
                    className="mt-2 w-full border-gray-300 focus:ring-green-500"
                    value={
                      answers.questions.find((q) => q.id === question.id)
                        ?.answer || ""
                    }
                    onChange={(e) => handleChange(question.id, e.target.value)}
                  />
                )}

                {question.type === "textarea" && (
                  <Textarea
                    maxLength={255}
                    placeholder="Masukkan jawaban Anda..."
                    className="mt-2 w-full border-gray-300 focus:ring-green-500 focus:border-green-500 h-32 resize-y"
                    value={
                      answers.questions.find((q) => q.id === question.id)
                        ?.answer || ""
                    }
                    required
                    onChange={(e) => handleChange(question.id, e.target.value)}
                  />
                )}

                {errors[question.id] && (
                  <p className="text-red-500 text-sm mt-1">
                    Pertanyaan ini wajib diisi!
                  </p>
                )}
              </CardContent>
            </Card>
          ))}

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-700 transition-all text-white font-semibold text-lg py-3 rounded-xl shadow-md"
          >
            {isSubmitting ? "Mengirim..." : "Kirim Jawaban"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
