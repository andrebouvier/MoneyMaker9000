{/*
  How It Works component for homepage
*/}

export function HowItWorks() {


    return (
        <section id="HowItWorks" className="bg-background-secondary py-20 md:py-32 px-4">
            <div className="max-w-6xl mx-auto flex flex-col items-center">
                <h2 className="text-text text-center text-4xl md:text-5xl font-bold">How It Works</h2>
                <p className="text-text-secondary text-center mt-4 max-w-3xl">
                    Our Options Trading Bot simplifies the complex world of options trading through an intuitive, step-by-step process.
                </p>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
                    {/* Step 1 */}
                    <div className="bg-surface rounded-2xl p-6 md:p-8 shadow-sm border border-border/20 transition-transform duration-300 ease-in-out hover:-translate-y-1">
                        <div className="w-12 h-12 rounded-full primary flex items-center justify-center text-text font-extrabold text-lg">
                            1
                        </div>
                        <h3 className="text-text mt-6 text-xl font-semibold">Choose your risk profile</h3>
                        <p className="text-text-secondary mt-3 text-sm leading-relaxed">
                            Set your risk tolerance through our intuitive interface.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-surface rounded-2xl p-6 md:p-8 shadow-sm border border-border/20 transition-transform duration-300 ease-in-out hover:-translate-y-1">
                        <div className="w-12 h-12 rounded-full primary flex items-center justify-center text-text font-extrabold text-lg">
                            2
                        </div>
                        <h3 className="text-text mt-6 text-xl font-semibold">Bot Analyzes Market</h3>
                        <p className="text-text-secondary mt-3 text-sm leading-relaxed">
                            Our algorithm continuously scans the market for opportunities that match your strategy criteria.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-surface rounded-2xl p-6 md:p-8 shadow-sm border border-border/20 transition-transform duration-300 ease-in-out hover:-translate-y-1">
                        <div className="w-12 h-12 rounded-full primary flex items-center justify-center text-text font-extrabold text-lg">
                            3
                        </div>
                        <h3 className="text-text mt-6 text-xl font-semibold">Automated Execution</h3>
                        <p className="text-text-secondary mt-3 text-sm leading-relaxed">
                            The bot executes trades automatically based on your parameters, with real-time monitoring and adjustments.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}