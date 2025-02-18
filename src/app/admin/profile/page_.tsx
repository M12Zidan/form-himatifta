// import { signOut } from "@/lib/auth";
// import { useSession } from "next-auth/react"
// import { User, LogOut } from "lucide-react";

// export default function ProfilePage() {
//   const session = useSession();

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
//       <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
//         <User size={48} className="mx-auto text-gray-700" />
//         <h1 className="text-xl font-semibold mt-4">{session.data?.user?.name}</h1>
//         <p className="text-gray-600">{session.data?.user?.email}</p>

//         <button
//           onClick={() => signOut()}
//           className="mt-6 flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition-all"
//         >
//           <LogOut size={20} />
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }
