import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {
  return (
    <section id="home" className="relative h-[85dvh] min-h-[500px] flex items-center justify-center text-center text-foreground">
      <Image
        src="/images/portada.jpg"
        alt="Mujer practicando yoga en la playa de Paraty al amanecer"
        data-ai-hint="yoga beach sunrise"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-white/80" />
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
        <div className="max-w-3xl">
          <p className="font-headline text-lg md:text-xl tracking-wider uppercase opacity-90">
            Xoana Mende • Yoga en Paraty
          </p>
          <h1 className="mt-4 font-headline text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Una pausa para observar. Un sitio seguro para conectar.
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto opacity-95">
            Descubrí el equilibrio y la serenidad con clases y workshops de yoga diseñados para renovar tu energía en el corazón de Paraty.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="#services">Ver Servicios</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#contact">Contactar</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
