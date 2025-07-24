"use client";

import { Beaker, GraduationCap, Microscope, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimatedCounter } from '../AnimatedCounter/AnimatedCounter'

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] w-full items-center py-[100px] max-[1300px]:px-[50px] max-[1000px]:px-[25px]  max-[1000px]:py-[60px] max-[680px]:py-[40px]">
      {/* Hero Section */}
      <section className="relative pb-[80px] overflow-hidden bg-gradient-to-b from-background to-secondary/20">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-[28px] md:text-[36px] lg:text-6xl font-bold tracking-[-2%]">
              About ABC Laboratories
            </h1>
            <p className="text-base lg:text-xl text-muted-foreground">
              Empowering scientific discovery through accessible mobile laboratory services
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className=" bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-[28px] lg:text-[36px] font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                ABC Laboratories is dedicated to breaking down barriers in scientific research and education by providing accessible, state-of-the-art mobile laboratory facilities to researchers, students, and technicians across the country.
              </p>
              <p className="text-lg text-muted-foreground">
                Our innovative mobile bio lab service brings advanced equipment and expertise directly to you, enabling hands-on experience and practical learning opportunities in biological sciences.
              </p>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden max-[1100px]:h-[438px] max-[1100px]:w-[450px] max-[1000px]:w-[100%]">
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/8089185/pexels-photo-8089185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="lg:py-16 max-[1100px]:py-10 bg-secondary/20">
      <div className="container">
        <div className="grid max-[500px]:grid-cols-1 max-[1100px]:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Beaker className="h-8 w-8 mb-4 text-chart-1" />,
              stat: 1000,
              label: "Experiments Conducted",
            },
            {
              icon: <Users className="h-8 w-8 mb-4 text-chart-4" />,
              stat: 500,
              label: "Active Users",
            },
            {
              icon: <Microscope className="h-8 w-8 mb-4 text-chart-2" />,
              stat: 50,
              label: "Lab Equipment Types",
            },
            {
              icon: <GraduationCap className="h-8 w-8 mb-4 text-chart-5" />,
              stat: 100,
              label: "Partner Institutions",
            },
          ].map((item, i) => (
            <Card key={i} className="text-center border-none bg-transparent">
              <CardContent className="pt-6">
                <div className="flex justify-center text-[30px]">{item.icon}</div>
                <AnimatedCounter
                    targetNumber={item.stat}
                    duration={2000}
                    suffix="+"
                    className="text-[36px] font-bold mb-2"
                  />

                <div className="text-base text-muted-foreground">{item.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

      {/* Team Section */}
      <section className="lg:py-16 md:py-10 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-[28px] md:text-[36px] lg:text-5xl tracking[-2%] font-bold mb-4">Our Team</h2>
            <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the dedicated professionals behind ABC Laboratories who are passionate about making scientific research and education accessible to all.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  {[
    {
      name: "Dr. Sarah Chen",
      role: "Scientific Director",
      bio: "Ph.D. in Molecular Biology with 15 years of research experience",
      image: "https://images.pexels.com/photos/5726706/pexels-photo-5726706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "Technical Lead",
      bio: "Specialist in mobile laboratory systems and equipment maintenance",
      image: "https://images.pexels.com/photos/5726794/pexels-photo-5726794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Dr. Emily Thompson",
      role: "Education Coordinator",
      bio: "Expert in scientific education and curriculum development",
      image: "https://images.pexels.com/photos/5726835/pexels-photo-5726835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ].map((member, i) => (
    <div
      key={i}
      className={i === 2 ? "md:col-span-2 md:col-start-1 md:flex md:justify-center lg:col-span-1 lg:col-start-auto" : ""}
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="aspect-[4/3] relative rounded-lg overflow-hidden mb-4">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${member.image})` }}
            />
          </div>
          <CardTitle>{member.name}</CardTitle>
          <CardDescription>{member.role}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{member.bio}</p>
        </CardContent>
      </Card>
    </div>
  ))}
          </div>

        </div>
      </section>
    </div>
  );
}