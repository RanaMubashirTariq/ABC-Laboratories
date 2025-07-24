"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Plus, Search, Tag, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import DashboardLayout from "@/components/dashboard/layout";
import { cn } from "@/lib/utils";
import { Protocol } from "@/lib/types";

// Mock data - in a real app, this would come from an API
const mockProtocols: Protocol[] = [
  {
    id: "1",
    title: "Water Quality Analysis",
    description: "Standard method for testing water quality parameters including pH, dissolved oxygen, and turbidity",
    steps: [
      { stepNumber: 1, instruction: "Collect water sample in sterile container" },
      { stepNumber: 2, instruction: "Measure pH using calibrated probe" },
      { stepNumber: 3, instruction: "Determine dissolved oxygen content" },
      { stepNumber: 4, instruction: "Measure turbidity using nephelometer" },
      { stepNumber: 5, instruction: "Record all measurements and observations" },
    ],
    category: "Water Analysis",
    experimentType: "Chemical Testing",
    biologicalSampleType: ["water"],
    createdBy: "admin",
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-15"),
  },
  {
    id: "2",
    title: "Soil Nutrient Analysis",
    description: "Procedure for analyzing soil samples for nitrogen, phosphorus, potassium, and other nutrients",
    steps: [
      { stepNumber: 1, instruction: "Collect soil sample from designated area" },
      { stepNumber: 2, instruction: "Air-dry sample for 24 hours" },
      { stepNumber: 3, instruction: "Sieve sample to remove debris" },
      { stepNumber: 4, instruction: "Extract nutrients using standard solution" },
      { stepNumber: 5, instruction: "Analyze extract using colorimetric methods" },
    ],
    category: "Soil Analysis",
    experimentType: "Chemical Testing",
    biologicalSampleType: ["soil"],
    createdBy: "admin",
    createdAt: new Date("2025-02-10"),
    updatedAt: new Date("2025-02-10"),
  },
  {
    id: "3",
    title: "Plant DNA Extraction",
    description: "Standard protocol for extracting DNA from plant tissues using CTAB method",
    steps: [
      { stepNumber: 1, instruction: "Collect fresh plant tissue samples" },
      { stepNumber: 2, instruction: "Grind tissue in mortar with liquid nitrogen" },
      { stepNumber: 3, instruction: "Add CTAB extraction buffer" },
      { stepNumber: 4, instruction: "Incubate at 65°C for 1 hour" },
      { stepNumber: 5, instruction: "Extract with chloroform:isoamyl alcohol" },
      { stepNumber: 6, instruction: "Precipitate DNA with isopropanol" },
      { stepNumber: 7, instruction: "Wash and resuspend DNA in TE buffer" },
    ],
    category: "Molecular Biology",
    experimentType: "DNA Analysis",
    biologicalSampleType: ["plant"],
    createdBy: "admin",
    createdAt: new Date("2025-03-05"),
    updatedAt: new Date("2025-03-05"),
  },
  {
    id: "4",
    title: "Microbial Culture Isolation",
    description: "Procedure for isolating pure bacterial cultures from environmental samples",
    steps: [
      { stepNumber: 1, instruction: "Prepare serial dilutions of environmental sample" },
      { stepNumber: 2, instruction: "Plate dilutions on appropriate culture media" },
      { stepNumber: 3, instruction: "Incubate plates at optimal temperature" },
      { stepNumber: 4, instruction: "Select and isolate individual colonies" },
      { stepNumber: 5, instruction: "Perform streak plate technique to obtain pure cultures" },
    ],
    category: "Microbiology",
    experimentType: "Bacterial Analysis",
    biologicalSampleType: ["water", "soil"],
    createdBy: "admin",
    createdAt: new Date("2025-04-20"),
    updatedAt: new Date("2025-04-20"),
  },
];

const categories = ["All Categories", "Water Analysis", "Soil Analysis", "Molecular Biology", "Microbiology"];
const experimentTypes = ["All Types", "Chemical Testing", "DNA Analysis", "Bacterial Analysis"];

export default function ProtocolsPage() {
  const [protocols] = useState<Protocol[]>(mockProtocols);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All Categories");
  const [typeFilter, setTypeFilter] = useState<string>("All Types");

  // Filter protocols based on search query and filters
  const filteredProtocols = protocols.filter((protocol) => {
    const matchesSearch = 
      protocol.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      protocol.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      categoryFilter === "All Categories" || 
      protocol.category === categoryFilter;
    
    const matchesType = 
      typeFilter === "All Types" || 
      protocol.experimentType === typeFilter;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Protocols</h1>
            <p className="text-muted-foreground">
              Browse and reference standardized laboratory protocols
            </p>
          </div>
          <Button asChild>
            <Link href="/protocols/new">
              <Plus className="h-4 w-4 mr-2" />
              New Protocol
            </Link>
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search protocols..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select 
                value={categoryFilter}
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger className="w-full sm:w-44">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select 
                value={typeFilter}
                onValueChange={setTypeFilter}
              >
                <SelectTrigger className="w-full sm:w-44">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  {experimentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Protocol Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProtocols.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-semibold">No protocols found</h3>
                <p className="mt-1 text-sm text-muted-foreground max-w-sm">
                  We couldn't find any protocols matching your search criteria. Try adjusting your filters or create a new protocol.
                </p>
                <Button className="mt-4" asChild>
                  <Link href="/protocols/new">
                    <Plus className="h-4 w-4 mr-2" />
                    New Protocol
                  </Link>
                </Button>
              </div>
            ) : (
              filteredProtocols.map((protocol) => (
                <Card key={protocol.id} className="overflow-hidden transition-all hover:shadow-md">
                  <CardHeader className="pb-3">
                    <CardTitle>{protocol.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{protocol.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                          <Tag className="mr-1 h-3 w-3" />
                          {protocol.category}
                        </div>
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                          {protocol.experimentType}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {protocol.steps.length} steps • Last updated {new Date(protocol.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="ml-auto" asChild>
                      <Link href={`/protocols/${protocol.id}`}>
                        View Protocol
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </DashboardLayout>
  );
}