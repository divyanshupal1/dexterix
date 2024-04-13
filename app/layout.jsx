import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Helping Hands",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body 
        className={cn(
          "h-screen max-md:block hidden bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
