'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePathname } from 'next/navigation';



export default function LayoutLandingPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Mendapatkan path aktif

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-green-600 text-white shadow-lg fixed w-full z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">HIMATIFTA</Link>

          {/* Hamburger Menu for Mobile */}
          <button 
            className="md:hidden block focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Tabs Navigation */}
          <div
            className={`md:flex md:items-center md:space-x-6 ${
              isOpen ? 'block' : 'hidden'
            } absolute md:static bg-green-600 md:bg-transparent w-full md:w-auto left-0 top-16 p-4 md:p-0 transition-all`}
          >
            <Tabs defaultValue={pathname} className="w-full">
              <TabsList className="w-full flex md:space-x-4 bg-transparent">
                <TabsTrigger value="/" asChild>
                  <Link href="/" className="text-lg px-4 py-2">
                    Home
                  </Link>
                </TabsTrigger>
                <TabsTrigger value="/form" asChild>
                  <Link href="/form" className="text-lg px-4 py-2">
                    Client
                  </Link>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </nav>

      <main className="pt-20 flex-1 container mx-auto px-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center p-4 mt-auto">
        <p>&copy; 2025 HIMATIFTA. All rights reserved.</p>
      </footer>
    </div>
  );
}
