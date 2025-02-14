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
import { SquarePen} from "lucide-react";
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
          📋 Daftar Layanan
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
              {forms.map((form) => (
                <TableRow
                  key={form.form_id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <TableCell className="px-6 py-4 text-gray-800">
                    <span className="font-semibold">{form.nama_form}</span>
                  </TableCell>
                  <TableCell className="px-6 py-4 flex justify-center gap-3">
                    <Button
                      size="sm"
                      className="bg-blue-500 text-white hover:bg-blue-600"
                    >
                      <SquarePen size={16} className="mr-1" />{" "}
                      <Link href={`/client/form/${form.form_id}`}>Ikuti</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Child>
  );
}

export default page;
