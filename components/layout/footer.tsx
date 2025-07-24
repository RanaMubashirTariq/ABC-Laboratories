import Link from 'next/link';
import { Beaker } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-background flex justify-center  w-full px-[100px] max-[1300px]:px-[50px] max-[1000px]:px-[25px] ">
      <div className="container py-8 md:py-12 ">
        <div className="flex justify-between gap-8 max-[1000px]:flex-col">
          <div className="w-[350px] max-[680px]:w-[100%]">
            <div className="flex items-center gap-2">
              <Beaker className="h-6 w-6 text-chart-1" />
              <span className="font-bold text-xl">ABC Laboratories</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Facilitating scientists, researchers, and students by providing a free-of-cost mobile bio lab service.
            </p>
          </div>
          
              <div className='flex justify-between gap-[30px] w-[60%]  max-[1000px]:w-[100%] max-[680px]:flex-wrap'>
              <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Home</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors text-sm">About</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Services</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Lab Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services/mobile-lab" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Mobile Bio Lab</Link></li>
              <li><Link href="/services/experiments" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Practical Experiments</Link></li>
              <li><Link href="/services/equipment" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Lab Equipment</Link></li>
              <li><Link href="/services/training" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Training Programs</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Email: info@abclabs.com</li>
              <li className="text-muted-foreground">Phone: +1 (123) 456-7890</li>
              <li className="text-muted-foreground">Hours: 9:00 AM - 5:00 PM</li>
            </ul>
          </div>
              </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ABC Laboratories. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}