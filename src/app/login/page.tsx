"use client";

import * as React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Child from "../page";
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
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    email: "", // Ubah dari username ke email
    password: "",
  });
  const [error, setError] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  
    if (!formData.email || !formData.password) {
      setError("Email dan Password wajib diisi!");
      return;
    }
  
    const result = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });
  
    if (result?.error) {
      setError("Login gagal. Periksa kembali email dan password!");
      setFormData({ email: formData.email, password: "" });
      
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    <Child>
      <Card className="w-[350px] mx-auto mt-40">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold text-green-600">
            HIMATIFTA
          </CardTitle>
          <CardDescription>
            Sistem Informasi Himpunan Mahasiswa Teknik Informatika UNITOMO
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <CardFooter className="flex justify-between mt-4">
              <Button variant="outline">
                <Link href="/admin/register">Register</Link>
              </Button>
              <Button type="submit">Login</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </Child>
  );
}

export default Page;
