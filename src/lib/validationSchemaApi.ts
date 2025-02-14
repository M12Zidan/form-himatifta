import { z } from "zod";


const typeQuestionMapping: Record<string, number> = {
  text: 1,
  textarea: 2,
  checkbox: 3,
  multiple: 4,
};

// Schema untuk pertanyaan
const questionSchema = z.object({
  question: z.string().min(3, "Pertanyaan minimal 3 karakter"),
  type_question_id: z.enum(["multiple", "checkbox", "text", "textarea"]).transform((val) => typeQuestionMapping[val]), 
  answer_options: z.array(z.string()).optional(), 
});

// Schema untuk form
export const formSchema = z.object({
  user_id: z.string().uuid(),
  nama_form: z.string().min(3, "Nama form minimal 3 karakter"),
  description_form: z.string().optional(),
  status: z.boolean().optional(),
  questions: z.array(questionSchema).min(1, "Minimal ada 1 pertanyaan dalam form"), 
});

const questionUpadateSchema = z.object({
  question_id: z.string().uuid().optional(),
  question: z.string().min(3, "Pertanyaan minimal 3 karakter"),
  type_question_id: z.enum(["multiple", "checkbox", "text", "textarea"]).transform((val) => typeQuestionMapping[val]), 
  answer_options: z.array(z.string()).optional(), 
});

export const updateFormSchema = z.object({
  nama_form: z.string().optional(),
  deskripsi: z.string().optional(),
  status: z.boolean().optional(),
  questions: z.array(questionUpadateSchema).min(1, "Minimal ada 1 pertanyaan dalam form"),
});

const answerSchema = z.object({
  id: z.string().uuid({message: "id questions tidak valid"}),
  answer: z.string().min(1, "Harus Ada Jawaban"),
});

export const responseFormSchema = z.object({
  form_id: z.string().uuid({message: "form_id tidak valid"}),
  questions: z.array(answerSchema).min(1, "Minimal ada 1 jawaban dalam form"),
});

export const setStatusFormSchema = z.object({
  form_id: z.string().uuid({message: "form_id tidak valid"}),
});