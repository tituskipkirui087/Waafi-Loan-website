import Header from "../sections/Header";
import Footer from "../sections/Footer";
import { Outlet } from "react-router-dom";
import "./MainLayout.css";

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-144px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}