import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "./prisma";
import bcryptjs from "bcryptjs";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email dan password diperlukan");
        }

        // Cek apakah pengguna ada di database
        const user = await prisma.user.findFirst({
          where: { email: credentials?.email },
        });

        if (!user) {
          throw new Error("Pengguna tidak ditemukan");
        }

        const isPasswordValid = await bcryptjs.compare(credentials.password.toString(), user.password);

        if (!isPasswordValid) {
          throw new Error("Password salah");
        }

        return { id: user.user_id, email: user.email, name: user.nm_lengkap };
      },
    }),
  ],
})