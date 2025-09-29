"use client";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, Bell, Menu, User, Settings, Search } from "lucide-react";
import { apiUrl } from "@/api_config";
import Link from "next/link";
import { setAccessToken, getAccessToken, clearAccessToken } from "../lib/tokenManager";

export default function NavBar() {
  const accessToken = getAccessToken();

  const [data, setData] = useState(null);
  const [notificationData, setNotificationData] = useState(null);
  const [notificationNumber, setNotificationNumber] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Home");

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch(`${apiUrl}/notifications/admin/count/`, {  
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        }, 
      })
        .then((res) => res.json())
        .then((data) => {
          setNotificationData(data.message);
          setNotificationNumber(Object.keys(data).length);
        });
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/login_register/profile`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.message);
        setLoading(false);
        console.log("message: " + data);
      });
  }, []);
  
  const setTokenLogout = () => {
    setAccessToken("0");
    window.location.href = "/login";
  }

  const toggleMobileMenu = () => {
    // Create custom event to toggle sidebar
    const event = new CustomEvent('sidebarToggle', { 
      detail: { collapsed: !isMobileMenuOpen } 
    });
    window.dispatchEvent(event);
    
    setMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <header className="fixed w-full glass border-b border-white/20 z-40 shadow-large backdrop-blur-xl">
      <div className="flex justify-between items-center px-4 md:px-6 py-3">
        <div className="flex items-center">
          <button 
            className="lg:hidden mr-4 p-2 rounded-xl hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <Menu size={24} className="text-gray-700" />
          </button>
          
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <div className="flex h-10 w-10 rounded-2xl bg-gradient-primary items-center justify-center mr-3 shadow-glow group-hover:shadow-glow-lg transition-all duration-300">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-400 rounded-full animate-pulse"></div>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold gradient-text">Fayida Academy</h1>
              <p className="text-xs text-gray-500 font-medium">Admin Portal</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {/* Enhanced Search Bar */}
          <div className="hidden md:flex items-center glass rounded-2xl px-4 py-2.5 shadow-soft hover:shadow-medium transition-all duration-300">
            <Search className="h-4 w-4 text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Search anything..."
              className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-48 lg:w-64 focus:text-gray-900"
            />
          </div>

          {/* Enhanced Notification Button */}
          <Link href="/notifications">
            <div className="relative p-3 rounded-2xl hover:bg-white/10 transition-all duration-200 group">
              <Bell className="h-5 w-5 text-gray-600 group-hover:text-primary-600 transition-colors" />
              {notificationNumber > 0 && (
                <div className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                  {notificationNumber}
                </div>
              )}
            </div>
          </Link>

          {/* Enhanced User Profile Menu */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center space-x-3 p-2 rounded-2xl hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/50 group">
                <div className="relative">
                  <div className="h-9 w-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all duration-300">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div className="hidden sm:block text-left">
                  <span className="font-semibold text-sm text-gray-800 block">Admin User</span>
                  <span className="text-xs text-gray-500">Administrator</span>
                </div>
              </button>
            </PopoverTrigger>

            <PopoverContent className="w-64 p-3 glass-card border-white/20 shadow-large" align="end">
              <div className="space-y-2">
                {/* User Info */}
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-primary/5 border border-primary-200/20">
                  <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">Admin User</p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                </div>
                
                <div className="h-px bg-gray-200/50 my-2"></div>
                
                <Link href="/profile">
                  <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/50 transition-all duration-200 cursor-pointer group">
                    <User size={18} className="text-gray-500 group-hover:text-primary-600 transition-colors" />
                    <span className="text-sm font-medium text-gray-700">Profile Settings</span>
                  </div>
                </Link>
                
                <Link href="/settings">
                  <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/50 transition-all duration-200 cursor-pointer group">
                    <Settings size={18} className="text-gray-500 group-hover:text-primary-600 transition-colors" />
                    <span className="text-sm font-medium text-gray-700">System Settings</span>
                  </div>
                </Link>
                
                <div className="h-px bg-gray-200/50 my-2"></div>
                
                {/* Enhanced Logout Button */}
                <button 
                  onClick={setTokenLogout}
                  className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-red-50/50 text-red-600 transition-all duration-200 cursor-pointer group"
                >
                  <LogOut size={18} className="group-hover:text-red-700 transition-colors" />
                  <span className="text-sm font-medium">Sign Out</span>
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
