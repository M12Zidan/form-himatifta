"use client";

import Child from "../../page";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

function Page() {
  const [formName, setFormName] = useState("Untitled Form");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    { id: 1, text: "Pertanyaan 1", type: "text", options: [""] },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: questions.length + 1, text: "", type: "text", options: [""] },
    ]);
  };

  const updateQuestion = (id : any, key : any, value :any) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [key]: value } : q))
    );
  };

  const sendForm = () => {
    console.log("Nama Form:", formName);
    console.log("Deskripsi:", description);
    console.log("Pertanyaan:", questions);
  };

  return (
    <Child>
      <div className="w-full max-w-2xl mx-auto py-10 space-y-6">
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
          {questions.map((q) => (
            <Card key={q.id}>
              <CardHeader>
                <CardTitle>Pertanyaan {q.id}</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  value={q.text}
                  onChange={(e) => updateQuestion(q.id, "text", e.target.value)}
                  placeholder="Masukkan pertanyaan"
                />

                <Select
                  value={q.type}
                  onValueChange={(value) => updateQuestion(q.id, "type", value)}
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
                  {q.type === "text" && (
                    <Input placeholder="Jawaban singkat..." disabled />
                  )}
                  {q.type === "textarea" && (
                    <Textarea placeholder="Jawaban panjang..." disabled />
                  )}
                  {q.type === "multiple" && (
                    <div className="space-y-2">
                      {q.options.map((opt, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input type="radio" disabled />
                          <Input
                            value={opt}
                            onChange={(e) => {
                              const newOptions = [...q.options];
                              newOptions[idx] = e.target.value;
                              updateQuestion(q.id, "options", newOptions);
                            }}
                            placeholder="Opsi pilihan"
                          />
                        </div>
                      ))}
                      <Button
                        onClick={() =>
                          updateQuestion(q.id, "options", [...q.options, ""])
                        }
                        variant="outline"
                        className="mt-2"
                      >
                        + Tambah Opsi
                      </Button>
                    </div>
                  )}
                  {q.type === "checkbox" && (
                    <div className="space-y-2">
                      {q.options.map((opt, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Checkbox disabled />
                          <Input
                            value={opt}
                            onChange={(e) => {
                              const newOptions = [...q.options];
                              newOptions[idx] = e.target.value;
                              updateQuestion(q.id, "options", newOptions);
                            }}
                            placeholder="Opsi checkbox"
                          />
                        </div>
                      ))}
                      <Button
                        onClick={() =>
                          updateQuestion(q.id, "options", [...q.options, ""])
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
            Kirim Form
          </Button>
        </div>
      </div>
    </Child>
  );
}

export default Page;
