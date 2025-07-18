import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Xoana Yoga | Clases y Workshops en Paraty',
  description: 'Una pausa para observar. Descubrí el equilibrio y la serenidad con clases de yoga y workshops personalizados por Xoana Mende en Paraty.',
  keywords: ['yoga', 'Paraty', 'clases de yoga', 'workshops', 'meditacion', 'bienestar', 'Xoana Mende'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
