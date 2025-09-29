"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  CreditCard, 
  Package, 
  TrendingUp, 
  Users, 
  DollarSign,
  ArrowRight,
  Activity,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import LoadProfileAuth from "@/main_components/loadProfileAuth";

export default function PurchaseManagementDashboard() {
  const stats = [
    {
      title: "Total Purchases",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-blue-600"
    },
    {
      title: "Revenue",
      value: "₦1,234,567",
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Active Users",
      value: "1,892",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Conversion Rate",
      value: "24.8%",
      change: "+2.1%",
      trend: "up",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  const quickActions = [
    {
      title: "Course Purchases",
      description: "Manage course package purchases and subscriptions",
      href: "/purchaselist_managment/purchase_list",
      icon: Package,
      color: "bg-blue-500",
      count: "1,234"
    },
    {
      title: "Mock Exam Purchases",
      description: "Handle mock exam package purchases",
      href: "/purchase_list_mock_package",
      icon: Activity,
      color: "bg-green-500",
      count: "567"
    },
    {
      title: "Pending Transactions",
      description: "Review and process pending transactions",
      href: "/transaction_table",
      icon: Clock,
      color: "bg-yellow-500",
      count: "89"
    },
    {
      title: "Completed Transactions",
      description: "View completed transaction history",
      href: "/transaction_completed_table",
      icon: CheckCircle,
      color: "bg-emerald-500",
      count: "2,758"
    }
  ];

  const recentActivity = [
    {
      type: "purchase",
      user: "John Doe",
      package: "Premium Course Package",
      amount: "₦45,000",
      status: "completed",
      time: "2 minutes ago"
    },
    {
      type: "purchase",
      user: "Jane Smith",
      package: "Mock Exam Bundle",
      amount: "₦25,000",
      status: "pending",
      time: "5 minutes ago"
    },
    {
      type: "refund",
      user: "Mike Johnson",
      package: "Basic Course",
      amount: "₦15,000",
      status: "processing",
      time: "1 hour ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <LoadProfileAuth />
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Purchase Management</h1>
            <p className="text-gray-600">Monitor and manage all purchase activities across the platform</p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="px-3 py-1">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              System Online
            </Badge>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="glass-card border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link key={index} href={action.href}>
                <Card className="glass-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl ${action.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {action.count}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                    <div className="flex items-center text-sm text-blue-600 font-medium">
                      Manage <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="glass-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-blue-600" />
                Recent Purchase Activity
              </CardTitle>
              <CardDescription>Latest purchase and transaction activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'purchase' ? 'bg-green-100' : 'bg-orange-100'
                      }`}>
                        {activity.type === 'purchase' ? (
                          <ShoppingCart className="h-4 w-4 text-green-600" />
                        ) : (
                          <CreditCard className="h-4 w-4 text-orange-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{activity.user}</p>
                        <p className="text-sm text-gray-600">{activity.package}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{activity.amount}</p>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={activity.status === 'completed' ? 'default' : 
                                   activity.status === 'pending' ? 'secondary' : 'outline'}
                          className="text-xs"
                        >
                          {activity.status}
                        </Badge>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div>
          <Card className="glass-card border-0 shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Payment Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Completed</span>
                  </div>
                  <span className="font-semibold">2,758</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-yellow-600 mr-2" />
                    <span className="text-sm">Pending</span>
                  </div>
                  <span className="font-semibold">89</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
                    <span className="text-sm">Failed</span>
                  </div>
                  <span className="font-semibold">23</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Quick Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link href="/purchaselist_managment/purchase_update_list">
                  <Button variant="outline" className="w-full justify-start">
                    <Package className="h-4 w-4 mr-2" />
                    Purchase Updates
                  </Button>
                </Link>
                <Link href="/purchaselist_managment/material_mgmt">
                  <Button variant="outline" className="w-full justify-start">
                    <Activity className="h-4 w-4 mr-2" />
                    Material Management
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analytics Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

