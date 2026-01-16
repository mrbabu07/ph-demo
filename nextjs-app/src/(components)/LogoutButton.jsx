"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear auth cookie
    document.cookie = "auth=; path=/; max-age=0";
    // Redirect to home
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full bg-white/10 text-white px-4 py-3 rounded-lg hover:bg-white/20 transition-all font-medium border border-white/20 hover:border-white/40"
    >
      🚪 Logout
    </button>
  );
}
