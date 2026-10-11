export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="font-display text-3xl text-primary">CHIPCO</span>
          <span className="font-display text-3xl text-dark-text">SNEAKS</span>
        </div>
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-muted mt-4">Loading...</p>
      </div>
    </div>
  );
}