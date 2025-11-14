import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ConditionalSidebar } from "@/components/ConditionalSidebar";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] })

export const metadata = {
  title: "Aura Care",
  description: "This is a interactive comunication tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <ConditionalSidebar>
            {children}
          </ConditionalSidebar>
        </AuthProvider>
      </body>
    </html>
  );
}
