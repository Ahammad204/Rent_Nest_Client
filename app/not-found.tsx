import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <h1 className="font-heading text-6xl font-bold text-foreground">404</h1>
        <p className="text-xl text-muted-foreground">
          The page you are looking for does not exist.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/properties"
            className="px-6 py-2.5 border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors"
          >
            Browse Properties
          </Link>
        </div>
      </div>
    </div>
  );
}
