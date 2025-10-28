import { Navbar } from "@/components/navbar";
import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

export default function DefaultLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="relative flex flex-col min-h-screen w-screen overflow-auto">
      <Navbar />
      <main className="w-full h-full border-t border-default-200">
        {children || <Outlet />}
      </main>
    </div>
  );
}
