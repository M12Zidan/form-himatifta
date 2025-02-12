"use client";

import Child from "../page";
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
import { Pencil, Trash, Eye } from "lucide-react";
import axios from "axios";

function page() {
  interface data {
    form_id: string;
    nama_form: string;
    deskripsi: string;
    status: boolean;
    createdBy: {
      id: string;
      nama: string;
    };
  }

  const [forms, setForms] = useState<data[]>([]);

  const fetch = async () => {
    try {
      const response = await axios.get("/api/form");
      setForms(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <Child>
      <div className="w-full max-w-5xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          📋 Status Form Aktif
        </h1>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
          <Table className="w-full border-collapse">
            <TableHeader className="bg-green-100">
              <TableRow>
                <TableHead className="px-6 py-3 text-left text-gray-700 font-semibold">
                  Nama Form
                </TableHead>
                <TableHead className="px-6 py-3 text-left text-gray-700 font-semibold">
                  Dibuat Oleh
                </TableHead>
                <TableHead className="px-6 py-3 text-center text-gray-700 font-semibold">
                  Status
                </TableHead>
                <TableHead className="px-6 py-3 text-center text-gray-700 font-semibold">
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
                  <TableCell className="px-6 py-4 text-gray-800">
                    <span className="font-semibold">{form.nama_form + " "}</span>
                    {form.deskripsi}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-600">
                    {form.createdBy.nama}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-center">
                    <Button
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        form.status === true
                          ? "bg-green-500 text-white"
                          : form.status === false
                          ? "bg-yellow-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {form.status ? "Atif" : "Noaktif"}
                    </Button>
                  </TableCell>
                  <TableCell className="px-6 py-4 flex justify-center gap-3">
                    <Button
                      size="sm"
                      className="bg-blue-500 text-white hover:bg-blue-600"
                    >
                      <Eye size={16} className="mr-1" />{" "}
                      <Link href={`/admin/${form.form_id}`}>Lihat</Link>
                    </Button>
                    <Button
                      size="sm"
                      className="bg-yellow-500 text-white hover:bg-yellow-600"
                    >
                      <Pencil size={16} className="mr-1" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      className="bg-red-500 text-white hover:bg-red-600"
                    >
                      <Trash size={16} className="mr-1" /> Hapus
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Link
          href="/admin/login"
          className="block w-1/6 max-w-sm  mt-6 bg-green-500 hover:bg-green-600 text-white text-center py-4 rounded-lg px-8"
        >
          Login
        </Link>
      </div>
    </Child>
  );
}

export default page;
