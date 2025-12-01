import react from "react";

export function CTA() {
  return (
    <section className="bg-background-secondary px-4 md:px-8 py-16 md:py-24 border-t border-border">
      <div className="max-w-4xl mx-auto text-center bg-background-secondary/30 rounded-2xl border border-border p-8 md:p-12">
        <h2 className="text-text text-2xl md:text-3xl font-extrabold mb-4">
          Ready to Automate Your Options Trading?
        </h2>
        <p className="text-text/90 mb-8 max-w-2xl mx-auto">
          Join thousands of traders who are already using our bot to optimize their trading
          strategies and improve their returns.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#get-started"
            className="inline-block bg-primary-dark text-text-secondary px-6 md:px-8 py-3 rounded-lg font-semibold text-sm md:text-base hover:opacity-90 transition-opacity"
          >
            Start Free Trial
          </a>
          <a
            href="#schedule-demo"
            className="inline-block border-2 border-primary-dark text-text px-6 md:px-8 py-3 rounded-lg font-semibold text-sm md:text-base hover:bg-primary-dark hover:text-text-secondary transition-colors"
          >
            Schedule Demo
          </a>
        </div>
      </div>
    </section>
  );
}


