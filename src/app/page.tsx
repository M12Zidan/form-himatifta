'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Layout({ children }: any) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

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
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Navbar Links */}
          <div className={`md:flex space-x-6 ${isOpen ? "block" : "hidden"} absolute md:static bg-green-600 md:bg-transparent w-full md:w-auto left-0 top-16 p-4 md:p-0`}>
            <Link href="/" className="block text-lg hover:text-gray-300 py-2 md:py-0">Home</Link>
            <Link href="/client/form" className="block text-lg hover:text-gray-300 py-2 md:py-0">Client</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section for Home Page */}
      {pathname === "/" && (
        <main className="pt-20 flex-1 container mx-auto px-4 text-center">
          <img 
            src="https://www.masakapahariini.com/wp-content/uploads/2020/02/kumpulan-resep-nasi-goreng.jpg" 
            alt="Nasi Goreng" 
            className="w-full max-w-3xl mx-auto rounded-lg shadow-lg object-cover h-64"
          />
        </main>
      )}

      {/* Main Content */}
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
