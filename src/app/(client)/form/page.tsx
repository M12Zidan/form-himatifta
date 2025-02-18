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
import { SquarePen } from "lucide-react";
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
  
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get("/api/form");
        const filteredForms = response.data.data.filter((form: Data) => form.status);
        setForms(filteredForms);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    fetchForms();
  }, []);

  return (
      <div className="w-full max-w-5xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          📋 Daftar Layanan Aktif
        </h1>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
          <Table className="w-full border-collapse">
            <TableHeader className="bg-green-100">
              <TableRow>
                <TableHead className="px-6 py-3 text-left text-gray-700 font-semibold">
                  Nama Form
                </TableHead>
                <TableHead className="px-6 py-3 text-center text-gray-700 font-semibold">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {forms.length > 0 ? (
                forms.map((form) => (
                  <TableRow
                    key={form.form_id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <TableCell className="px-6 py-4 text-gray-800">
                      <span className="font-semibold">{form.nama_form}</span>
                    </TableCell>
                    <TableCell className="px-6 py-4 flex justify-center gap-3">
                      <Link href={`/form/${form.form_id}`} passHref>
                        <Button
                          size="sm"
                          className="bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-1"
                        >
                          <SquarePen size={16} /> Ikuti
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="px-6 py-4 text-center text-gray-500">
                    Tidak ada layanan aktif.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
  );
}

export default Page;
