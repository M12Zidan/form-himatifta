"use client";

import * as React from "react";
import Child from "../../page";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Page() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("Semua kolom harus diisi!");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Format email tidak valid!");
      return;
    }

    if (formData.username.length < 6 || formData.password.length < 6) {
      alert("Username dan Password harus minimal 6 karakter!");
      return;
    }

    console.log( JSON.stringify(formData, null, 2));
  };

  return (
    <Child>
      <Card className="w-[400px] mx-auto mt-32 shadow-lg rounded-lg border border-gray-200">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold text-green-600">HIMATIFTA</CardTitle>
          <CardDescription>
            Sistem Informasi Himpunan Mahasiswa Teknik Informatika UNITOMO
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Nama lengkap"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="example@gmail.com"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Password</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Username"
                  // value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Confirm Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-6 bg-green-500 hover:bg-green-600">
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-gray-600">
            Sudah punya akun?{" "}
            <Link href="/admin/login" className="text-green-600 hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </Child>
  );
}

export default Page;
