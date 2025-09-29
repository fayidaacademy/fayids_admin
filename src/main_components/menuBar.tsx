"use client";
import React, { useEffect, useState } from "react";
import { AccordionMenu } from "../my_components/menu_list";
import Link from "next/link";
import { apiUrl } from "@/api_config";
import { 
  Home, 
  Users, 
  BookOpen, 
  FileText, 
  Settings, 
  BarChart3
} from "lucide-react";
import {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
} from "../lib/tokenManager";

export default function MenuBar() {
  const accessToken = getAccessToken();

  const [accountType, setAccountType] = useState(null);
  const [isLoading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(`${apiUrl}/newlogin/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAccountType(data.accountType);
        setLoading(false);
        console.log("message: " + data.firstName);
      });
  }, []);

  // Define menu items for different account types
  const menuItems = [
    { 
      icon: <Home size={20} className="mr-3 text-blue-600" />, 
      label: "Dashboard", 
      href: "/", 
      permissions: ["Admin", "SubAdmin", "Assistant"],
      active: true // assuming dashboard is default active
    },
    { 
      icon: <Users size={20} className="mr-3 text-gray-500" />, 
      label: "Students", 
      href: "/students", 
      permissions: ["Admin", "SubAdmin"] 
    },
    { 
      icon: <Users size={20} className="mr-3 text-gray-500" />, 
      label: "Exam Takers", 
      href: "/examtakers", 
      permissions: ["Admin"] 
    },
    { 
      icon: <FileText size={20} className="mr-3 text-gray-500" />, 
      label: "Exams", 
      href: "/exams", 
      permissions: ["Admin", "SubAdmin"] 
    },
    { 
      icon: <BookOpen size={20} className="mr-3 text-gray-500" />, 
      label: "Courses", 
      href: "/courses", 
      permissions: ["Admin", "SubAdmin", "Assistant"] 
    },
    { 
      icon: <BarChart3 size={20} className="mr-3 text-gray-500" />, 
      label: "Reports", 
      href: "/reports", 
      permissions: ["Admin"] 
    },
    { 
      icon: <Settings size={20} className="mr-3 text-gray-500" />, 
      label: "Settings", 
      href: "/settings", 
      permissions: ["Admin"] 
    },
  ];

  // Filter menu items based on user's account type
  const filteredMenuItems = menuItems.filter(item => 
    accountType && item.permissions.includes(accountType)
  );


  if (isLoading) {
    return (
      <div className="h-full w-full bg-white p-4">
        <div className="animate-pulse space-y-4 pt-16">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Menu list */}
      <nav className="flex-1">
        {(accountType === "Admin" || accountType === "SubAdmin" || accountType === "Assistant") && (
          <div className="space-y-1">
            {filteredMenuItems.map((item, index) => (
              <Link href={item.href} key={index}>
                <div className="flex items-center px-3 py-2.5 rounded-xl hover:bg-primary-50 transition-all duration-200 cursor-pointer text-gray-700 font-medium group relative"> 
                  <div className="p-1.5 mr-3 rounded-lg transition-all duration-200 group-hover:bg-primary-100/50">
                    {React.cloneElement(item.icon, { 
                      size: 20,
                      className: "mr-3 text-gray-600 group-hover:text-primary-700 transition-colors duration-200"
                    })}
                  </div>
                  <span className="truncate text-sm font-medium text-gray-700 group-hover:text-primary-700 transition-colors duration-200">
                    {item.label}
                  </span>
                  
                  {/* Active Indicator */}
                  {item.active && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gradient-primary rounded-r-full"></div>
                  )}
                </div>
              </Link>
            ))}
            
            {/* AccordionMenu - Always expanded */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <AccordionMenu />
            </div>
          </div>
        )}
      </nav>

      {/* User Info Footer */}
      <div className="border-t border-white/10">
        <div className="flex items-center p-3">
          <div className="relative">
            <div className="h-9 w-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Users size={16} className="text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div className="ml-3 animate-fade-in">
            <p className="text-sm font-semibold text-gray-800">{accountType}</p>
            <p className="text-xs text-gray-500">Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}
