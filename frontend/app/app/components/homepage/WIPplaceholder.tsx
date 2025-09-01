export function WIPplaceholder() {
  return (
    <div className="flex flex-col items-center justify-center bg-background py-20 md:py-32 px-4 min-h-screen">
      <div className="text-center max-w-2xl mx-auto">

        {/* Logo/Icon Placeholder */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-4">
            <img src="/public/MoneyMakerLogo.png" className="h-22" alt="Options Trading Bot Logo" />
          </div>
        </div>
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl md:text-6xl font-bold text-text mb-6">
        MoneyMaker9000
      </h1>

      {/* Coming Soon Badge */}
      <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold text-lg">
        <svg className="w-5 h-5 mr-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Stay Tuned for updates
      </div>
    </div>
  );
}
