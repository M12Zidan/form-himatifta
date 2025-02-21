"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  MessageCircleMore,
  Eye,
  ShieldCheck,
  ShieldOff,
  Wrench,
  User,
  CirclePlus,
  Loader2,
  Trash,
} from "lucide-react";
import axios from "axios";

function Page() {
  interface Data {
    form_id: string;
    nama_form: string;
    deskripsi: string;
    status: boolean;
    createdBy: {
      id: string;
      nama: string;
    };
  }

  const [forms, setForms] = useState<Data[]>([]);
  const [loading, setLoading] = useState<string | null>(null);

  const fetchForms = async () => {
    try {
      const response = await axios.get("/api/form");
      setForms(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateStatus = async (id: string) => {
    setLoading(id); // Set loading saat klik
    try {
      const response = await axios.post("/api/form/status", { form_id: id });

      // Update status form secara lokal setelah sukses
      setForms((prevForms) =>
        prevForms.map((form) =>
          form.form_id === id ? { ...form, status: !form.status } : form
        )
      );

      console.log("Status form berhasil diupdate");
    } catch (error) {
      console.error("Gagal mengupdate status form:", error);
    }
    setLoading(null); // Hapus loading setelah selesai
  };

  useEffect(() => {
    fetchForms();
  }, []);

  return (
      <div className="w-full max-w-5xl mx-auto py-10 px-4 md:px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          📋 Status Form Aktif
        </h1>

        {/* Tabel */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
          <Table className="w-full border-collapse">
            <TableHeader className="bg-green-100">
              <TableRow>
                <TableHead className="px-6 py-3 text-left text-gray-700 font-bold">
                  Nama Form
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-gray-700 font-bold">
                  Dibuat Oleh
                </TableHead>
                <TableHead className="px-6 py-3 text-center text-gray-700 font-bold">
                  Status
                </TableHead>
                <TableHead className="px-6 py-3 text-center text-gray-700 font-bold">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {forms.map((form) => (
                <TableRow
                  key={form.form_id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <TableCell className="px-6 py-4 text-gray-800 break-words max-w-xs">
                    <span className="font-semibold">
                      {form.nama_form + " "}
                    </span>
                    <span className="text-gray-600 text-sm">
                      {form.deskripsi}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-600">
                    {form.createdBy.nama}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-center">
                    <Button
                      onClick={() => handleUpdateStatus(form.form_id)}
                      disabled={loading === form.form_id}
                      className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${
                        form.status
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {loading === form.form_id ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : form.status ? (
                        <ShieldCheck size={16} />
                      ) : (
                        <ShieldOff size={16} />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="px-6 py-4 flex flex-wrap justify-center gap-2">
                    <Link href={`/admin/form/${form.form_id}`}>
                      <Button
                        size="sm"
                        className="bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-1"
                      >
                        <Eye size={16} />
                      </Button>
                    </Link>
                    <Link href={`/admin/edit/${form.form_id}`}>
                      <Button
                        size="sm"
                        className="bg-yellow-500 text-white hover:bg-yellow-600 flex items-center gap-1"
                      >
                        <Wrench size={16} />
                      </Button>
                    </Link>
                    <Link href={`/admin/response/${form.form_id}`}>
                      <Button
                        size="sm"
                        className="bg-indigo-500 text-white hover:bg-fuchsia-600 flex items-center gap-1"
                      >
                        <MessageCircleMore  size={16}/>
                      </Button>
                    </Link>
                    <Link href={`/admin/delete/${form.form_id}`}>
                    <Button
                        size="sm"
                        className="bg-red-500 text-white hover:bg-red-600 flex items-center gap-1"
                        // onClick={() => handleDelete(form.form_id)}
                    >
                      <Trash size={16} />
                    </Button>
                    

                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-center gap-6 items-center mt-12">
          {/* Tombol Create */}
          <Link
            href="/admin/create"
            className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-300"
          >
            <CirclePlus size={28} />
          </Link>

          {/* Tombol Profile */}
          <Link
            href="/admin/profile"
            className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-all duration-300"
          >
            <User size={28} />
          </Link>
        </div>
      </div>
  );
}

export default Page;
