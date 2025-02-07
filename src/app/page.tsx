'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Layout({ children } :any) {

  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-green-600 text-white shadow-lg fixed w-full z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">HIMATIFTA</Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="block text-lg hover:text-gray-300">Home</Link>
            <Link href="/client" className="block text-lg hover:text-gray-300">Client</Link>
            <Link href="/admin" className="block text-lg hover:text-gray-300">Admin</Link>
          </div>
        </div>
      </nav>

      {pathname === "/" && (
        <main className="pt-20 flex-1 container mx-auto px-4">
          <img src="https://www.masakapahariini.com/wp-content/uploads/2020/02/kumpulan-resep-nasi-goreng.jpg" alt="" />
        </main>
      )}
      
      {/* Main Content */}
      <main className="pt-20 flex-1 container mx-auto px-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center p-4 mt-10">
        <p>&copy; 2025 HIMATIFTA. All rights reserved.</p>
      </footer>
    </div>
  );
}
