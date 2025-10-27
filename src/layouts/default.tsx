import { Navbar } from "@/components/navbar";
import { Outlet, useNavigation } from "react-router-dom";

export default function DefaultLayout() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
  return (
    <div className="relative flex flex-col min-h-screen w-screen overflow-auto">
      <Navbar />
      <main className="w-full h-full border-t border-default-200">
        <Outlet />
      </main>
    </div>
  );
}
