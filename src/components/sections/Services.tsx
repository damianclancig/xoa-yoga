import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Feather, Sprout } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: <Sprout className="h-10 w-10 text-primary" />,
    title: "Clases de Yoga",
    description: "Clases grupales y particulares adaptadas a tu nivel. Exploramos diferentes estilos para que encuentres tu práctica ideal, fortaleciendo cuerpo y mente.",
  },
  {
    icon: <Feather className="h-10 w-10 text-primary" />,
    title: "Workshops Especiales",
    description: "Talleres temáticos de fin de semana para profundizar en aspectos específicos del yoga, la meditación y el bienestar. Una inmersión total para renovarte.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Mis Servicios</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Te ofrezco un espacio para crecer, explorar y encontrar tu calma interior a través de prácticas conscientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service) => (
            <Card key={service.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  {service.icon}
                </div>
                <CardTitle className="mt-4 font-headline text-2xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="mb-4 text-lg">¿Querés conocer los horarios y más detalles?</p>
          <Button asChild size="lg">
            {/* The PDF file should be placed in the /public directory */}
            <a href="/guia-bienestar-xoana-yoga.pdf" download>
              <Download className="mr-2 h-5 w-5" />
              Descargar Guía de Bienestar (PDF)
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
