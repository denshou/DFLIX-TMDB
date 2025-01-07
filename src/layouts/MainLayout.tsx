import { Outlet } from "react-router-dom";
import Footer from "@components/Footer";
import Header from "@components/Header";

export default function MainLayout() {
  return (
    <div className="w-full min-h-screen bg-[#141414] text-white overflow-x-hidden overflow-y-hidden">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
