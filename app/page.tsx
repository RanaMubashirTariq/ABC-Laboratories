import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Beaker,
  BookOpen,
  Calendar,
  ClipboardList,
  Microscope,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <div className="flex items-center flex-col min-h-[calc(100vh-4rem)] w-full ">
      {/* Hero Section */}
      <section className="flex items-center justify-center relative py-20  max-[1100px]:py-15  max-[1000px]:px-[25px] max-[800px]:py-10 overflow-hidden bg-gradient-to-b from-background to-secondary/20 w-full">
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.pexels.com/photos/954585/pexels-photo-954585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center"></div>
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6 max-[680px]:space-y-3">
            <h1 className="text-[28px] md:text-[36px] lg:text-6xl font-bold tracking-[-2%] ">
              Mobile Bio Lab at Your Fingertips
            </h1>
            <p className="md:text-base lg:text-xl text-muted-foreground ">
              Access advanced laboratory equipment and conduct practical experiments with our 
              mobile biology lab service for researchers, students, and technicians.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="gap-2">
                <Link href="/register">
                  Get Started
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 max-[800px]:py-10 bg-background max-[1100px]:px-[50px] max-[1000px]:px-[25px]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-[28px] md:text-[36px] lg:text-5xl font-bold mb-4">Key Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our mobile bio lab provides essential tools and services for conducting 
              biological experiments and research on the go.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-[680px]:gap-5">
            {[
              {
                title: "Mobile Lab Access",
                description: "Reserve time slots to access our fully-equipped mobile biology laboratory.",
                icon: <Beaker className="h-10 w-10 text-chart-1" />,
              },
              {
                title: "Sample Analysis",
                description: "Collect, process, and analyze biological samples with professional equipment.",
                icon: <Microscope className="h-10 w-10 text-chart-2"  />,
              },
              {
                title: "Data Visualization",
                description: "Interactive charts and visualizations for analyzing experimental results.",
                icon: <ClipboardList className="h-10 w-10 text-chart-3" />,
              },
              {
                title: "Experiment Protocols",
                description: "Access standardized protocols and step-by-step guides for experiments.",
                icon: <BookOpen className="h-10 w-10 text-chart-4" />,
              },
              {
                title: "Smart Scheduling",
                description: "Book lab time based on availability and receive confirmation instantly.",
                icon: <Calendar className="h-10 w-10 text-chart-5" />,
              },
              {
                title: "Educational Resources",
                description: "Learn and practice using professional biological equipment with guidance.",
                icon: <GraduationCap className="h-10 w-10 text-chart-1" />,
              },
            ].map((feature, i) => (
              <div 
                key={i} 
                className="relative group p-6 rounded-xl border bg-card text-card-foreground transition-all duration-300 hover:shadow-md"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 max-[800px]:py-10 bg-secondary/20 max-[1100px]:px-[50px] max-[1000px]:px-[25px]">
        <div className="container">
          <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
            <div className="grid  lg:grid-cols-2 gap-10 items-center">
              <div className="p-8  max-[800px]:p-5 flex  flex-col max-[1000px]:items-center">
                <h2 className="text-[28px] md:text-[36px] lg:text-5xl font-bold mb-4">Ready to start experimenting?</h2>
                <p className="text-muted-foreground mb-6 max-[1000px]:text-center">
                  Register now to access our mobile bio lab services and start conducting 
                  your biological experiments with professional equipment and guidance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="gap-2">
                    <Link href="/register">
                      Register Now
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/services">View Services</Link>
                  </Button>
                </div>
              </div>
              <div className="relative h-64 md:h-full max-[1000px]:hidden">
                <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/8089182/pexels-photo-8089182.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials/Info Section */}
      <section className="py-16 max-[800px]:py-10 bg-background max-[1100px]:px-[50px] max-[1000px]:px-[25px]">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-[28px] md:text-4xl lg:text-5xl font-bold mb-4">Who Can Benefit</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our mobile bio lab services are designed to support various groups in the field of biological sciences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Students",
                description: "Gain hands-on experience with professional lab equipment and practical experiments to enhance learning.",
                gradient: "from-chart-1/20 to-chart-1/5",
              },
              {
                title: "Researchers",
                description: "Access advanced equipment for field research and process samples without returning to a central laboratory.",
                gradient: "from-chart-2/20 to-chart-2/5",
              },
              {
                title: "Technicians",
                description: "Practice and develop skills with various biological equipment and analysis techniques.",
                gradient: "from-chart-3/20 to-chart-3/5",
              },
            ].map((item, i) => (
              <div 
                key={i}
                className={cn(
                  "rounded-xl p-8 relative overflow-hidden",
                  `bg-gradient-to-br ${item.gradient}`
                )}
              >
                <div className="relative z-10">
                  <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}