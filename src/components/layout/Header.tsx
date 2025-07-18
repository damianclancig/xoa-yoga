"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

const navItems = [
  { label: "Inicio", href: "#home" },
  { label: "Servicios", href: "#services" },
  { label: "Testimonios", href: "#testimonials" },
  { label: "Contacto", href: "#contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="#home" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
          <Image src="/images/logo.svg" alt="Xoana Yoga Logo" width={80} height={80} className="h-20 w-20 text-primary" />
          <span className="font-headline text-xl font-bold text-primary">Xoana Yoga</span>
        </Link>
        
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                   <Link href="#home" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                      <Image src="/images/logo.svg" alt="Xoana Yoga Logo" width={80} height={80} className="h-20 w-20 text-primary" />
                      <span className="font-headline text-xl font-bold text-primary">Xoana Yoga</span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                        <X className="h-6 w-6" />
                        <span className="sr-only">Cerrar menú</span>
                    </Button>
                </div>
                <nav className="flex flex-col items-start gap-6 p-4 mt-4">
                  {navItems.map((item) => (
                    <Link key={item.label} href={item.href} className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
