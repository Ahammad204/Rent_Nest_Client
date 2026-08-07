export default function Loading() {
  return (
    <div className="min-h-screen bg-[background]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
          {/* Left — Gallery + Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="w-full h-96 bg-muted rounded-lg" />
            <div className="space-y-3">
              <div className="h-6 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/2" />
              <div className="h-8 bg-muted rounded w-1/3" />
            </div>
          </div>

          {/* Right — Sidebar */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="h-8 bg-muted rounded w-1/2 mx-auto mb-3" />
              <div className="h-10 bg-muted rounded" />
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="h-5 bg-muted rounded w-1/3 mb-4" />
              <div className="h-16 bg-muted rounded mb-3" />
              <div className="space-y-3">
                <div className="h-12 bg-muted rounded" />
                <div className="h-12 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
