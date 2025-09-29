"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MenuBar from "../main_components/menuBar";
import NavBar from "../main_components/navBar";
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/login');

  return (
    <html lang="en" className="h-full">
      <head>
        <title>Fayida Admin Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${inter.className} h-full overflow-hidden bg-gradient-mesh`}>
        <Toaster />
        <div className="flex h-screen relative">
          {/* Background Elements */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-accent-400/20 to-primary-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-secondary-400/10 to-accent-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
          </div>

          {/* Navigation bar - full width */}
          {!isAuthPage && <NavBar />}

          {/* Sidebar - Always Expanded */}
          {!isAuthPage && (
            <aside className="fixed inset-y-0 left-0 z-30 glass-card border-r border-white/20 shadow-large flex flex-col w-64 overflow-y-auto scrollbar-thin">
              {/* Logo & App Name */}
              <div className="flex items-center justify-center px-4 py-6 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                      <span className="text-lg text-white font-bold">F</span>
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-400 rounded-full animate-ping"></div>
                  </div>
                  <div className="animate-fade-in">
                    <span className="text-xl font-extrabold gradient-text tracking-tight">Fayida</span>
                    <p className="text-xs text-gray-500 font-medium">Admin</p>
                  </div>
                </div>
              </div>
              
              {/* MenuBar (menu items) */}
              <div className="flex-1 overflow-y-auto py-4 space-y-2 px-4">
                <MenuBar />
              </div>
              
              {/* Footer */}
              <div className="p-4 border-t border-white/10">
                <div className="text-center">
                  <p className="text-xs text-gray-500 font-medium">v2.0.0</p>
                  <p className="text-xs text-gray-400">Modern Design</p>
                </div>
              </div>
            </aside>
          )}

          {/* Main content */}
          <div className={`flex-1 flex flex-col ${!isAuthPage ? "ml-64" : ""}`}>
            {/* Main content area */}
            <main className={`flex-1 overflow-auto ${!isAuthPage ? "pt-24 px-4 md:px-6 pb-6" : ""}`}>
              {!isAuthPage ? ( 
                <div className="max-w-7xl mx-auto animate-slide-up">
                  {children}
                </div>
              ) : (
                children
              )}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

