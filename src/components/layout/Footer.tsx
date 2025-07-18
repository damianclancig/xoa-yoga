export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary py-6">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>&copy; {currentYear} Xoana Yoga. Todos los derechos reservados.</p>
        <p className="text-xs mt-2">
          Diseño y desarrollo web por{' '}
          <a
            href="https://clancig.com.ar"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-primary transition-colors"
          >
            clancig.com.ar
          </a>
        </p>
      </div>
    </footer>
  );
}
