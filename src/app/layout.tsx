"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../../components/navbar";
import { usePathname } from "next/navigation";
import { Poppins } from "next/font/google";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";
import { Suspense, useEffect } from "react";
import { usePayment } from "../../hooks";
// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"], // pick the weights you need
//   variable: "--font-poppins", // optional: CSS variable
// });
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
// export const metadata: Metadata = {
//   title: "Dotenv",
//   description: "Secure vault for your env",
// };


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {fetchPlans} = usePayment()

useEffect(()=>{


  fetchPlans()


},[])
  return (
    <html lang="en">
      <body
        className={geistSans.className}
      >
     
   {/* <RecoilRoot> */}

       <Suspense fallback={  <div className="flex items-center justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
        <span className="ml-2"> ...</span>
      </div>}>
        {children}
   </Suspense>
        <Toaster position="top-right" reverseOrder={false} />
   {/* </RecoilRoot> */}
    
      </body>
    </html>
  );
}
