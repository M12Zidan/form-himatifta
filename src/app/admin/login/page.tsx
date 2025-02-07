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
    username: "",
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

    if (!formData.username || !formData.password) {
      alert("Username dan Password wajib diisi!");
      return;
    }

    console.log(JSON.stringify(formData, null, 2));
  };

  return (
    <Child>
      <Card className="w-[350px] mx-auto mt-40">
        <CardHeader>
          <CardTitle>HIMATIFTA</CardTitle>
          <CardDescription>
            Sistem Informasi Himpunan Mahasiswa Teknik Informatika UNITOMO
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
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
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            <Link href="/admin/register">Register</Link>
          </Button>
          <Button onClick={handleSubmit}><Link href="/admin/create">Login</Link></Button>
        </CardFooter>
      </Card>
    </Child>
  );
}

export default Page;
