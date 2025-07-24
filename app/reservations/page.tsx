"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Check, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { cn } from "@/lib/utils";
import { Reservation } from "@/lib/types";

// Mock data - in a real app, this would come from an API
const mockReservations: Reservation[] = [
  {
    id: "1",
    userId: "user1",
    date: new Date("2025-06-10"),
    startTime: "10:00",
    endTime: "12:00",
    status: "confirmed",
    purpose: "Water quality analysis for research project",
    createdAt: new Date("2025-06-01"),
    updatedAt: new Date("2025-06-02"),
  },
  {
    id: "2",
    userId: "user1",
    date: new Date("2025-06-15"),
    startTime: "13:00",
    endTime: "15:00",
    status: "pending",
    purpose: "Soil sample processing for environmental study",
    createdAt: new Date("2025-06-03"),
    updatedAt: new Date("2025-06-03"),
  },
  {
    id: "3",
    userId: "user1",
    date: new Date("2025-06-20"),
    startTime: "09:00",
    endTime: "11:00",
    status: "confirmed",
    purpose: "Microscopy session for biology class",
    createdAt: new Date("2025-06-05"),
    updatedAt: new Date("2025-06-05"),
  },
];

export default function ReservationsPage() {
  const [reservations] = useState<Reservation[]>(mockReservations);
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Filter reservations for the selected date
  const reservationsOnDate = reservations.filter((reservation) => 
    date && 
    reservation.date.getDate() === date.getDate() && 
    reservation.date.getMonth() === date.getMonth() && 
    reservation.date.getFullYear() === date.getFullYear()
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reservations</h1>
            <p className="text-muted-foreground">
              Book and manage your mobile bio lab sessions
            </p>
          </div>
          <Button asChild>
            <Link href="/reservations/new">
              <Plus className="h-4 w-4 mr-2" />
              New Reservation
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
              <CardDescription>
                Choose a date to view or make reservations
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" onClick={() => setDate(new Date())}>
                Today
              </Button>
              <div className="text-sm text-muted-foreground">
                {date ? format(date, 'PPP') : 'No date selected'}
              </div>
            </CardFooter>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>
                {date
                  ? `Reservations for ${format(date, 'MMMM d, yyyy')}`
                  : 'Select a date to view reservations'}
              </CardTitle>
              <CardDescription>
                View available slots and your existing reservations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {reservationsOnDate.length === 0 ? (
                <div className="text-center py-8">
                  <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-semibold">No reservations</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    There are no reservations for this date. Create a new reservation to get started.
                  </p>
                  <Button className="mt-4" asChild>
                    <Link href="/reservations/new">
                      <Plus className="h-4 w-4 mr-2" />
                      New Reservation
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {reservationsOnDate.map((reservation) => (
                    <div
                      key={reservation.id}
                      className={cn(
                        "flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border",
                        reservation.status === "confirmed" 
                          ? "border-green-200 dark:border-green-900" 
                          : "border-amber-200 dark:border-amber-900"
                      )}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <div className={cn(
                            "w-2 h-2 rounded-full mr-2",
                            reservation.status === "confirmed" ? "bg-green-500" : "bg-amber-500"
                          )} />
                          <span className="font-medium">
                            {reservation.startTime} - {reservation.endTime}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{reservation.purpose}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        <Button
                          variant="outline"
                          size="sm"
                          className={cn(
                            reservation.status === "confirmed" 
                              ? "border-green-200 bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900 dark:border-green-900 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30" 
                              : "border-amber-200 bg-amber-100 text-amber-800 hover:bg-amber-200 hover:text-amber-900 dark:border-amber-900 dark:bg-amber-900/20 dark:text-amber-400 dark:hover:bg-amber-900/30"
                          )}
                        >
                          {reservation.status === "confirmed" ? (
                            <>
                              <Check className="h-4 w-4 mr-1" />
                              Confirmed
                            </>
                          ) : (
                            <>
                              <CalendarIcon className="h-4 w-4 mr-1" />
                              Pending
                            </>
                          )}
                        </Button>
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <X className="h-4 w-4" />
                          <span className="sr-only">Cancel</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="upcoming" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="all">All Reservations</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Reservations</CardTitle>
                <CardDescription>
                  Your scheduled mobile bio lab sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reservations
                    .filter(r => r.date > new Date())
                    .map((reservation) => (
                    <div 
                      key={reservation.id}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{format(reservation.date, 'MMMM d, yyyy')}</p>
                        <p className="text-sm text-muted-foreground">
                          {reservation.startTime} - {reservation.endTime}
                        </p>
                      </div>
                      <div className="md:col-span-2">
                        <div className="flex justify-between mb-2">
                          <span className={cn(
                            "text-xs px-2 py-1 rounded-full",
                            reservation.status === "confirmed" 
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                          )}>
                            {reservation.status === "confirmed" ? "Confirmed" : "Pending"}
                          </span>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="destructive" size="sm">Cancel</Button>
                          </div>
                        </div>
                        <p className="text-sm">{reservation.purpose}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="past">
            <Card>
              <CardHeader>
                <CardTitle>Past Reservations</CardTitle>
                <CardDescription>
                  Your previous mobile bio lab sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-semibold">No past reservations</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    You don't have any past mobile bio lab reservations yet.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Reservations</CardTitle>
                <CardDescription>
                  Complete history of your mobile bio lab reservations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reservations.map((reservation) => (
                    <div 
                      key={reservation.id}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{format(reservation.date, 'MMMM d, yyyy')}</p>
                        <p className="text-sm text-muted-foreground">
                          {reservation.startTime} - {reservation.endTime}
                        </p>
                      </div>
                      <div className="md:col-span-2">
                        <div className="flex justify-between mb-2">
                          <span className={cn(
                            "text-xs px-2 py-1 rounded-full",
                            reservation.status === "confirmed" 
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                              : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                          )}>
                            {reservation.status === "confirmed" ? "Confirmed" : "Pending"}
                          </span>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">View</Button>
                          </div>
                        </div>
                        <p className="text-sm">{reservation.purpose}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}