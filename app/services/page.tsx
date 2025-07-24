"use client";

import Link from "next/link";
import { 
  Beaker, 
  BookOpen, 
  ChevronRight, 
  ClipboardList, 
  GraduationCap, 
  Microscope, 
  Users 
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

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full items-center min-h-[calc(100vh-4rem)] max-[1300px]:px-[50px] max-[1100px]:px-[25px]">
      {/* Hero Section */}
      <section className="relative lg:py-20 max-[1000px]:py-[40px] overflow-hidden bg-gradient-to-b from-background to-secondary/20">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-[28px] md:text-4xl lg:text-6xl font-bold tracking-tight">
              Our Services
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground">
              Comprehensive mobile laboratory solutions for research, education, and scientific discovery
            </p>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="lg:py-16 max-[1000px]:py-[40px] bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Beaker className="h-12 w-12 mb-6 text-chart-1" />,
                title: "Mobile Bio Lab",
                description: "Access our fully-equipped mobile laboratory for on-site experiments and research",
                features: [
                  "State-of-the-art equipment",
                  "Professional lab environment",
                  "Flexible scheduling",
                  "On-site support",
                ],
                href: "/services/mobile-lab",
                colorClass: "text-chart-1",
              },
              {
                icon: <Microscope className="h-12 w-12 mb-6 text-chart-2" />,
                title: "Equipment Access",
                description: "Use professional-grade laboratory equipment for your research needs",
                features: [
                  "Modern instruments",
                  "Regular calibration",
                  "Technical support",
                  "Training available",
                ],
                href: "/services/equipment",
                colorClass: "text-chart-2",
              },
              {
                icon: <ClipboardList className="h-12 w-12 mb-6 text-chart-3" />,
                title: "Practical Experiments",
                description: "Conduct hands-on experiments with guidance from our expert staff",
                features: [
                  "Structured protocols",
                  "Safety guidelines",
                  "Results analysis",
                  "Documentation support",
                ],
                href: "/services/experiments",
                colorClass: "text-chart-3",
              },
              {
                icon: <BookOpen className="h-12 w-12 mb-6 text-chart-4" />,
                title: "Educational Resources",
                description: "Access comprehensive learning materials and documentation",
                features: [
                  "Digital library",
                  "Video tutorials",
                  "Practice exercises",
                  "Reference materials",
                ],
                href: "/services/resources",
                colorClass: "text-chart-4",
              },
              {
                icon: <GraduationCap className="h-12 w-12 mb-6 text-chart-5" />,
                title: "Training Programs",
                description: "Learn from experts with our specialized training sessions",
                features: [
                  "Hands-on training",
                  "Certificate courses",
                  "Workshop sessions",
                  "Custom programs",
                ],
                href: "/services/training",
                colorClass: "text-chart-5",
              },
              {
                icon: <Users className="h-12 w-12 mb-6 text-chart-1" />,
                title: "Collaboration",
                description: "Partner with other researchers and institutions in our network",
                features: [
                  "Research networking",
                  "Project collaboration",
                  "Data sharing",
                  "Joint programs",
                ],
                href: "/services/collaboration",
                colorClass: "text-chart-1",
              },
            ].map((service, i) => (
              <Card key={i} className="flex flex-col">
                <CardHeader>
                  <div className="flex justify-center">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl text-center">{service.title}</CardTitle>
                  <CardDescription className="text-center">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-center text-sm">
                        <ChevronRight className={`h-4 w-4 mr-2 ${service.colorClass}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={service.href}>Learn More</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="lg:py-16 max-[1000px]:py-[40px] bg-secondary/20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground">
              Join ABC Laboratories today and access our comprehensive range of mobile laboratory services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/register">Register Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}