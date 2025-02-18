"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdministratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  if (session.status === "unauthenticated") {
    return router.push("/login");
  }
  return (
    <main className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-green-600 text-white shadow-lg fixed w-full z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            HIMATIFTA
          </Link>

          {/* Hamburger Menu for Mobile */}
          <button
            className="md:hidden block focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Navbar Links */}
          <div
            className={`md:flex space-x-6 ${
              isOpen ? "block" : "hidden"
            } absolute md:static bg-green-600 md:bg-transparent w-full md:w-auto left-0 top-16 p-4 md:p-0`}
          >
            <Link
              href="/"
              className="block text-lg hover:text-gray-300 py-2 md:py-0"
            >
              Home
            </Link>
            <Link
              href="/form"
              className="block text-lg hover:text-gray-300 py-2 md:py-0"
            >
              Client
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-20 flex-1 container mx-auto px-4">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center p-4 mt-auto">
        <p>&copy; 2025 HIMATIFTA. All rights reserved.</p>
      </footer>
    </main>
  );
}
