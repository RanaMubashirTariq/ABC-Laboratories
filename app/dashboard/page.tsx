"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Activity, 
  BarChart3, 
  Beaker, 
  Calendar, 
  ClipboardList, 
  FileText, 
  User, 
  Plus,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import DashboardLayout from "@/components/dashboard/layout";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

// Mock data - in a real app, this would come from an API
const recentSamples = [
  { id: "SAM-001", type: "Water", date: "2025-06-03", status: "Analyzed" },
  { id: "SAM-002", type: "Soil", date: "2025-06-02", status: "Collected" },
  { id: "SAM-003", type: "Plant", date: "2025-06-01", status: "Processing" },
];

const upcomingReservations = [
  { id: "RES-001", date: "2025-06-10", time: "10:00 - 12:00", status: "confirmed" },
  { id: "RES-002", date: "2025-06-15", time: "13:00 - 15:00", status: "pending" },
];

const notifications = [
  { id: 1, message: "Your sample SAM-001 analysis is complete", time: "2 hours ago", isRead: false },
  { id: 2, message: "Reservation RES-001 confirmed for June 10th", time: "1 day ago", isRead: true },
  { id: 3, message: "New protocol added: Water Quality Analysis", time: "2 days ago", isRead: true },
];

export default function Dashboard() {
  // In a real app, we would fetch this data from the backend
  const [stats] = useState({
    totalSamples: 12,
    pendingReservations: 1,
    completedExperiments: 8,
    activeProtocols: 5,
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your recent lab activities.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="samples">Samples</TabsTrigger>
            <TabsTrigger value="reservations">Reservations</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Samples
                  </CardTitle>
                  <Beaker className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalSamples}</div>
                  <p className="text-xs text-muted-foreground">
                    +4 from last week
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pending Reservations
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pendingReservations}</div>
                  <p className="text-xs text-muted-foreground">
                    -2 from last week
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Completed Experiments
                  </CardTitle>
                  <ClipboardList className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.completedExperiments}</div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last week
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Protocols
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeProtocols}</div>
                  <p className="text-xs text-muted-foreground">
                    +1 from last week
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity and Upcoming Reservations */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Recent Samples</CardTitle>
                  <CardDescription>
                    Your recently collected or analyzed samples
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentSamples.map((sample) => (
                      <div key={sample.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            sample.status === "Analyzed" ? "bg-green-500" : 
                            sample.status === "Processing" ? "bg-amber-500" : "bg-blue-500"
                          )} />
                          <div>
                            <p className="text-sm font-medium">{sample.id}: {sample.type} Sample</p>
                            <p className="text-xs text-muted-foreground">{sample.date}</p>
                          </div>
                        </div>
                        <p className="text-sm">{sample.status}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" asChild className="w-full">
                    <Link href="/samples">
                      View all samples
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Upcoming Reservations</CardTitle>
                  <CardDescription>
                    Your scheduled mobile lab sessions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingReservations.map((reservation) => (
                      <div key={reservation.id} className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{reservation.date}</p>
                          <p className="text-xs text-muted-foreground">{reservation.time}</p>
                        </div>
                        <Button 
                          variant={reservation.status === "confirmed" ? "outline" : "secondary"}
                          size="sm"
                        >
                          {reservation.status === "confirmed" ? "Confirmed" : "Pending"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" asChild className="w-full">
                    <Link href="/reservations">
                      Manage reservations
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and actions you might want to perform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button asChild variant="outline" className="h-auto flex flex-col p-4 gap-2 items-center justify-center">
                    <Link href="/reservations/new">
                      <Calendar className="h-6 w-6 mb-2" />
                      <span>New Reservation</span>
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="h-auto flex flex-col p-4 gap-2 items-center justify-center">
                    <Link href="/samples/new">
                      <Beaker className="h-6 w-6 mb-2" />
                      <span>Log Sample</span>
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="h-auto flex flex-col p-4 gap-2 items-center justify-center">
                    <Link href="/reports">
                      <BarChart3 className="h-6 w-6 mb-2" />
                      <span>View Reports</span>
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="h-auto flex flex-col p-4 gap-2 items-center justify-center">
                    <Link href="/protocols">
                      <ClipboardList className="h-6 w-6 mb-2" />
                      <span>Browse Protocols</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Samples Tab */}
          <TabsContent value="samples" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>My Samples</CardTitle>
                  <CardDescription>
                    Manage and view your biological samples
                  </CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Sample
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-4 p-4 font-medium border-b">
                    <div>ID</div>
                    <div>Type</div>
                    <div>Date</div>
                    <div>Status</div>
                  </div>
                  {recentSamples.map((sample) => (
                    <div key={sample.id} className="grid grid-cols-4 p-4 border-b last:border-0 hover:bg-muted/50">
                      <div>{sample.id}</div>
                      <div>{sample.type}</div>
                      <div>{sample.date}</div>
                      <div>{sample.status}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild className="ml-auto">
                  <Link href="/samples">View All Samples</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Reservations Tab */}
          <TabsContent value="reservations" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Upcoming Reservations</CardTitle>
                  <CardDescription>
                    Your scheduled mobile bio lab sessions
                  </CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Reservation
                </Button>
              </CardHeader>
              <CardContent>
                {upcomingReservations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <Calendar className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold">No upcoming reservations</h3>
                    <p className="text-muted-foreground max-w-md mt-2">
                      You don't have any upcoming mobile bio lab reservations. Create a new reservation to get started.
                    </p>
                    <Button className="mt-4">Schedule a Session</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingReservations.map((reservation) => (
                      <div key={reservation.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">{reservation.id}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            {reservation.date} • {reservation.time}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "text-xs px-2 py-1 rounded-full",
                            reservation.status === "confirmed" 
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                          )}>
                            {reservation.status === "confirmed" ? "Confirmed" : "Pending"}
                          </span>
                          <Button variant="outline" size="sm">View</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild className="ml-auto">
                  <Link href="/reservations">Manage All Reservations</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Updates and alerts from the mobile bio lab system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={cn(
                        "p-4 rounded-lg border flex items-start gap-4",
                        !notification.isRead && "bg-muted/40"
                      )}
                    >
                      <div className={cn(
                        "mt-1 rounded-full p-1",
                        !notification.isRead ? "bg-primary" : "bg-muted"
                      )}>
                        <AlertCircle className={cn(
                          "h-4 w-4",
                          !notification.isRead ? "text-primary-foreground" : "text-muted-foreground"
                        )} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className={cn(
                            "text-sm",
                            !notification.isRead && "font-medium"
                          )}>
                            {notification.message}
                          </p>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full">
                  Mark all as read
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}