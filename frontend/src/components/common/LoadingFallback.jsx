export default function LoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ledger-50 p-4">
      <div className="grid w-full max-w-5xl gap-5">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="animate-pulse overflow-hidden rounded-[2rem] border border-ledger-200 bg-white p-6 shadow-ledger"
          >
            <div className="h-5 w-40 rounded-full bg-ledger-100 mb-6" />
            <div className="space-y-4">
              <div className="h-4 w-full rounded-full bg-ledger-100" />
              <div className="h-4 w-5/6 rounded-full bg-ledger-100" />
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="h-20 rounded-[1.25rem] bg-ledger-100" />
                <div className="h-20 rounded-[1.25rem] bg-ledger-100" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
