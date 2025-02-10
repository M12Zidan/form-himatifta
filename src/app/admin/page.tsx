"use client";

import Child from "../page";
import Link from "next/link";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash, Eye } from "lucide-react";

function page() {
  const [forms, setForms] = useState([
    {
      id: 1,
      name: "Survey Kepuasan Mahasiswa",
      createdAt: "2024-02-05",
      status: "Aktif",
    },
    {
      id: 2,
      name: "Pendataan UKM Kampus",
      createdAt: "2024-01-20",
      status: "Nonaktif",
    },
    {
      id: 3,
      name: "Evaluasi Dosen Semester Ganjil",
      createdAt: "2024-01-15",
      status: "Aktif",
    },
    {
      id: 4,
      name: "Pendaftaran Beasiswa",
      createdAt: "2024-02-01",
      status: "Ditutup",
    },
  ]);

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
                  Tanggal Dibuat
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
                  key={form.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <TableCell className="px-6 py-4 text-gray-800">
                    {form.name}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-gray-600">
                    {form.createdAt}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-center">
                    <Badge
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        form.status === "Aktif"
                          ? "bg-green-500 text-white"
                          : form.status === "Nonaktif"
                          ? "bg-yellow-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {form.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-6 py-4 flex justify-center gap-3">
                    <Button
                      size="sm"
                      className="bg-blue-500 text-white hover:bg-blue-600"
                    >
                      <Eye size={16} className="mr-1" /> Lihat
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
