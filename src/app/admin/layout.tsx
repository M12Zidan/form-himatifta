import { auth } from "@/lib/auth";
import { SessionProvider } from "next-auth/react"
import { redirect } from "next/navigation";
 
export default async function Administrator({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user) {
    return redirect("/login");
  }
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}