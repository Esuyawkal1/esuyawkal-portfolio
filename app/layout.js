import { GoogleTagManager } from "@next/third-parties/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import CyberShell from "./components/cyber/cyber-shell";
import "./css/card.scss";
import "./css/globals.scss";

export const metadata = {
  title: "Portfolio of Esuyawkal - Software Developer & Creative Technologist",
  description:
    "Portfolio of Esuyawkal Fentahun. Full stack developer, AI engineer, and creative technologist crafting hyper-modern web applications.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <CyberShell />
        <ToastContainer theme="dark" />
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
          <ScrollToTop />
        </main>
        <Footer />
      </body>
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
    </html>
  );
}
