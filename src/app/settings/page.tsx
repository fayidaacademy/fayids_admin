import LoadProfileAuth from "@/main_components/loadProfileAuth";
import Link from "next/link";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Settings as SettingsIcon,
  Globe,
  CreditCard,
  MapPin,
  Building2,
  Package,
  MessageSquare,
  FileText,
  Megaphone,
  ChevronRight,
} from "lucide-react";

const settingsCategories = [
  {
    title: "Localization",
    description: "Configure language and regional settings",
    icon: Globe,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    items: [
      {
        name: "Languages",
        description: "Manage supported languages",
        href: "/settings/languages",
        icon: Globe,
      },
      {
        name: "Regions",
        description: "Configure regions and areas",
        href: "/settings/regions/regionlist",
        icon: MapPin,
      },
      {
        name: "Cities",
        description: "Manage cities database",
        href: "/settings/city/citylist",
        icon: Building2,
      },
    ],
  },
  {
    title: "Content Management",
    description: "Manage site content and media",
    icon: FileText,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    items: [
      {
        name: "Blogs",
        description: "Create and manage blog posts",
        href: "/settings/blogs",
        icon: FileText,
      },
      {
        name: "Advertisements",
        description: "Manage advertisement content",
        href: "/settings/advertisment",
        icon: Megaphone,
      },
      {
        name: "Messages",
        description: "System messages and notifications",
        href: "/settings/messages",
        icon: MessageSquare,
      },
    ],
  },
  {
    title: "Payment & Packages",
    description: "Configure payment and package options",
    icon: CreditCard,
    color: "text-green-600",
    bgColor: "bg-green-100",
    items: [
      {
        name: "Payment Methods",
        description: "Configure payment options",
        href: "/settings/payment_options",
        icon: CreditCard,
      },
      {
        name: "Package Folders",
        description: "Organize package categories",
        href: "/settings/packagefolders/packagefolderslist",
        icon: Package,
      },
    ],
  },
];

export default function Settings() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <LoadProfileAuth />

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <SettingsIcon className="h-8 w-8 text-primary" />
          Settings
        </h1>
        <p className="text-gray-500">
          Manage your application settings and configurations
        </p>
      </div>

      {/* Settings Categories */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
        {settingsCategories.map((category, categoryIndex) => {
          const CategoryIcon = category.icon;
          return (
            <Card key={categoryIndex}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`h-12 w-12 rounded-lg ${category.bgColor} flex items-center justify-center`}>
                    <CategoryIcon className={`h-6 w-6 ${category.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {category.items.map((item, itemIndex) => {
                    const ItemIcon = item.icon;
                    return (
                      <Link key={itemIndex} href={item.href}>
                        <div className="group flex items-center gap-3 p-4 rounded-lg border hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                          <div className="h-10 w-10 rounded-md bg-gray-100 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                            <ItemIcon className="h-5 w-5 text-gray-600 group-hover:text-primary transition-colors" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                              {item.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Info</CardTitle>
          <CardDescription>System configuration overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Globe className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Multi-language</p>
                <p className="text-xs text-muted-foreground">Support enabled</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Payments</p>
                <p className="text-xs text-muted-foreground">Active methods</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Content</p>
                <p className="text-xs text-muted-foreground">Management ready</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Regions</p>
                <p className="text-xs text-muted-foreground">Configured</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
