import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const siteUrl = "https://xoayoga.clancig.com.ar";
const siteTitle = "Xoana Yoga | Clases y Workshops en Paraty";
const siteDescription = "Una pausa para observar. Descubrí el equilibrio y la serenidad con clases de yoga y workshops personalizados por Xoana Mende en Paraty.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: ['yoga', 'Paraty', 'clases de yoga', 'workshops', 'meditacion', 'bienestar', 'Xoana Mende'],
  creator: 'Xoana Mende',
  publisher: 'Xoana Mende',
  authors: [{ name: 'Xoana Mende', url: siteUrl }],
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // URL canonica
  alternates: {
    canonical: '/',
  },
  
  // Open Graph (para redes sociales como Facebook, WhatsApp)
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: 'Xoana Yoga',
    images: [
      {
        url: '/images/portada.jpg', // Ruta relativa a /public
        width: 1200,
        height: 630,
        alt: 'Mujer practicando yoga en la playa de Paraty al amanecer',
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/images/portada.jpg'],
    creator: '@xoanamende', // Reemplazar con el usuario de Twitter si existe
  },

  // Favicons y otros iconos
  icons: {
    icon: '/images/logo.svg',
    shortcut: '/images/logo.svg',
    apple: '/images/logo.svg',
  },
  
  // Tema del navegador
  themeColor: '#6b85d8', // Color primario
  manifest: '/site.webmanifest', // Opcional: si tienes un manifiesto
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
