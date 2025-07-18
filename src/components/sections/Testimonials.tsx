"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Star, MessageSquarePlus } from "lucide-react";

const testimonials = [
  {
    name: "Ana P.",
    feedback: "Las clases con Xoana son un antes y un después. Me ayudó a conectar conmigo misma y a encontrar una paz que no sabía que necesitaba. ¡Súper recomendable!",
    rating: 5,
  },
  {
    name: "Marcos L.",
    feedback: "Excelente profesional. El workshop de meditación fue increíble, un ambiente súper cálido y seguro. Volveré sin dudas.",
    rating: 5,
  },
  {
    name: "Julia F.",
    feedback: "Encontré un lugar para mí, para hacer una pausa real en la semana. La energía de Xoana y del grupo es maravillosa. Gracias por tanto.",
    rating: 5,
  },
];

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  feedback: z.string().min(10, { message: "El testimonio debe tener al menos 10 caracteres." }),
});

export function Testimonials() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", feedback: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "¡Gracias por tu testimonio!",
      description: "Tu feedback fue enviado con éxito.",
    });
    form.reset();
    setOpen(false);
  }

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Lo que dicen mis alumnas</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Testimonios de quienes ya encontraron su espacio de pausa y conexión.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-headline text-xl">{testimonial.name}</CardTitle>
                  <div className="flex gap-1">
                    {Array(testimonial.rating).fill(0).map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">"{testimonial.feedback}"</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button size="lg">
                        <MessageSquarePlus className="mr-2 h-5 w-5" />
                        Dejar mi testimonio
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Compartí tu experiencia</DialogTitle>
                        <DialogDescription>
                            Tu opinión es muy importante para mí y para futuras alumnas.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tu Nombre</FormLabel>
                                <FormControl>
                                <Input placeholder="Cómo te llamás" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="feedback"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tu Testimonio</FormLabel>
                                <FormControl>
                                <Textarea placeholder="Contá tu experiencia..." {...field} rows={4} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                         <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">Cancelar</Button>
                            </DialogClose>
                            <Button type="submit">Enviar Testimonio</Button>
                        </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
      </div>
    </section>
  );
}
