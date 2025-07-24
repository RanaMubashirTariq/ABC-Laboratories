"use client";

import { useState } from "react";
import Link from "next/link";
import { Beaker, Download, Filter, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardLayout from "@/components/dashboard/layout";
import { cn } from "@/lib/utils";
import { Sample } from "@/lib/types";

// Mock data - in a real app, this would come from an API
const mockSamples: Sample[] = [
  {
    id: "1",
    sampleId: "WAT-001",
    sampleType: "water",
    collectionTime: new Date("2025-06-01T10:30:00"),
    collectionDate: new Date("2025-06-01"),
    geolocation: { latitude: 40.7128, longitude: -74.006 },
    fieldConditions: { temperature: 22.5, pH: 7.2 },
    userId: "user1",
    notes: "Sample collected from river mouth",
    createdAt: new Date("2025-06-01"),
    updatedAt: new Date("2025-06-01"),
  },
  {
    id: "2",
    sampleId: "SOI-001",
    sampleType: "soil",
    collectionTime: new Date("2025-06-02T14:15:00"),
    collectionDate: new Date("2025-06-02"),
    geolocation: { latitude: 40.7129, longitude: -74.007 },
    fieldConditions: { pH: 6.8 },
    userId: "user1",
    notes: "Forest soil sample with high organic content",
    createdAt: new Date("2025-06-02"),
    updatedAt: new Date("2025-06-02"),
  },
  {
    id: "3",
    sampleId: "BIO-001",
    sampleType: "biological",
    collectionTime: new Date("2025-06-03T09:45:00"),
    collectionDate: new Date("2025-06-03"),
    geolocation: { latitude: 40.7130, longitude: -74.008 },
    fieldConditions: { temperature: 21.0 },
    userId: "user1",
    notes: "Leaf tissue sample from oak tree",
    createdAt: new Date("2025-06-03"),
    updatedAt: new Date("2025-06-03"),
  },
  {
    id: "4",
    sampleId: "WAT-002",
    sampleType: "water",
    collectionTime: new Date("2025-06-04T11:20:00"),
    collectionDate: new Date("2025-06-04"),
    geolocation: { latitude: 40.7131, longitude: -74.009 },
    fieldConditions: { temperature: 23.1, pH: 6.9, salinity: 0.2 },
    userId: "user1",
    notes: "Lake water sample, slight algal presence",
    createdAt: new Date("2025-06-04"),
    updatedAt: new Date("2025-06-04"),
  },
];

export default function SamplesPage() {
  const [samples] = useState<Sample[]>(mockSamples);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  // Filter samples based on search query and type filter
  const filteredSamples = samples.filter((sample) => {
    const matchesSearch = 
      sample.sampleId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sample.notes?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = 
      filterType === "all" || 
      sample.sampleType === filterType;
    
    return matchesSearch && matchesType;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Samples</h1>
          <p className="text-muted-foreground">
            Manage and track your biological samples.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex-1 flex flex-col sm:flex-row gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search samples..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select 
              value={filterType}
              onValueChange={setFilterType}
            >
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="water">Water</SelectItem>
                <SelectItem value="soil">Soil</SelectItem>
                <SelectItem value="plant">Plant</SelectItem>
                <SelectItem value="biological">Biological</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Sample
            </Button>
          </div>
        </div>

        {/* Sample Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sample ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Collection Date</TableHead>
                <TableHead>pH</TableHead>
                <TableHead>Temperature</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSamples.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No samples found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredSamples.map((sample) => (
                  <TableRow key={sample.id}>
                    <TableCell className="font-medium">{sample.sampleId}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          sample.sampleType === "water" ? "bg-blue-500" :
                          sample.sampleType === "soil" ? "bg-amber-800" :
                          sample.sampleType === "plant" ? "bg-green-500" :
                          "bg-purple-500"
                        )} />
                        <span className="capitalize">{sample.sampleType}</span>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(sample.collectionDate).toLocaleDateString()}</TableCell>
                    <TableCell>{sample.fieldConditions.pH || "N/A"}</TableCell>
                    <TableCell>{sample.fieldConditions.temperature ? `${sample.fieldConditions.temperature}°C` : "N/A"}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{sample.notes}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}