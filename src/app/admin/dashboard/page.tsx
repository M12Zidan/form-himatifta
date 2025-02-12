"use client";

import Child from "../../page";
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
import { Pencil, Trash, Eye, ShieldCheck, ShieldOff, Wrench } from "lucide-react";
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

  const fetchForms = async () => {
    try {
      const response = await axios.get("/api/form");
      setForms(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <Child>
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
                    <span className="font-semibold">{form.nama_form + " "}</span>
                    <span className="text-gray-600 text-sm">{form.deskripsi}</span>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-600">
                    {form.createdBy.nama}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-center">
                    <Button
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        form.status ? "bg-green-500 text-white" : "bg-yellow-500 text-white"
                      }`}
                    >
                      {form.status ? <ShieldCheck /> : <ShieldOff />}
                    </Button>
                  </TableCell>
                  <TableCell className="px-6 py-4 flex flex-wrap justify-center gap-2">
                    <Link href={`/admin/form/${form.form_id}`}>
                      <Button size="sm" className="bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-1">
                        <Eye size={16} /> 
                      </Button>
                    </Link>
                    <Button size="sm" className="bg-yellow-500 text-white hover:bg-yellow-600 flex items-center gap-1">
                    <Wrench size={16}/> 
                    </Button>
                    <Button size="sm" className="bg-red-500 text-white hover:bg-red-600 flex items-center gap-1">
                      <Trash size={16} /> 
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Tombol Login */}
        <Link
          href="/admin/create"
          className="block w-full md:w-1/4 mx-auto mt-6 bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-lg px-6"
        >
          Buat Form
        </Link>
      </div>
    </Child>
  );
}

export default Page;
