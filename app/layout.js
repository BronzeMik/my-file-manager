
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "@/components/ui/toaster"
import DashboardHeader from "./(routes)/home/_components/DashboardHeader";
import { SidebarProvider } from "@/context/SideBarContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};



export default function RootLayout({ children }) {  
  
  return (
    <ClerkProvider>
      <SidebarProvider>
      <html lang="en">
        <body className={inter.className}>
        <DashboardHeader />
          {children}
        <Toaster />
        </body>
      </html>
      </SidebarProvider>
    </ClerkProvider>
  );
}
