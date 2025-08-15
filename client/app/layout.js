import { Space_Grotesk, Ubuntu, Poppins } from "next/font/google";
import "./stylesheets/globals.css";
import Navbar from "@/components/Common/Navbar";
import { Toaster } from "sonner";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-space-grotesk",
});

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-ubuntu",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "GadgetHub",
  description: "Your one stop news & details for the latest gadgets and tech",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${spaceGrotesk.variable} ${ubuntu.variable} ${poppins.variable} font-primary`}
      >
        <Toaster richColors={true} /> <Navbar />
        {children}
      </body>
    </html>
  );
}
