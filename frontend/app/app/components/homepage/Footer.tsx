import React, { useState } from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  return (
    <footer id="ContactUs" className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* Company/Brand Column */}
          <div className="col-span-1">
            <h3 className="text-text font-bold text-xl mb-4">MoneyMaker 9000</h3>
            <p className="text-text opacity-80 dark:opacity-100 text-sm mb-4 leading-relaxed">
              Automated options trading webapp for inactive traders.
            </p>
            {/* Social Media Links */}
            <div className="flex gap-4 mt-4">
              <a
                href="https://github.com/andrebouvier/MoneyMaker9000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text opacity-70 dark:opacity-100 hover:opacity-100 transition-all"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="col-span-1">
            <h3 className="text-text font-semibold text-base mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#Features" className="text-text opacity-80 dark:opacity-100 hover:opacity-100 text-sm transition-all">
                  Features
                </a>
              </li>
              <li>
                <a href="#About" className="text-text opacity-80 dark:opacity-100 hover:opacity-100 text-sm transition-all">
                  About
                </a>
              </li>
              <li>
                <a href="https://github.com/andrebouvier/MoneyMaker9000/blob/main/README.md" target="_blank" rel="noopener noreferrer" className="text-text opacity-80 dark:opacity-100 hover:opacity-100 text-sm transition-all">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Contact/Support Column */}
          <div className="col-span-1">
            <h3 className="text-text font-semibold text-base mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="text-text opacity-80 dark:opacity-100">
                <span className="block mb-1">Email:</span>
                <a href="mailto:placeholder@example.com" className="text-text hover:text-primary-dark transition-colors">
                  [abouvier@sfsu.edu]
                  [acastellanos3@sfsu.edu]
                </a>
              </li>
              <li className="text-text opacity-80 dark:opacity-100">
                <span className="block mb-1">Support:</span>
                <a href="mailto:support@example.com" className="text-text hover:text-primary-dark transition-colors">
                  [abouvier@sfsu.edu]
                  [acastellanos3@sfsu.edu]
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-text opacity-70 dark:opacity-100 text-sm text-center md:text-left">
              <p>© {currentYear} MoneyMaker 9000. All rights reserved.</p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap gap-6 justify-center md:justify-end">
              <button
                onClick={() => setShowDisclaimer(true)}
                className="text-text opacity-70 dark:opacity-100 hover:opacity-100 text-sm transition-all cursor-pointer"
              >
                Disclaimer
              </button>
            </div>
          </div>

          {/* Developer Credit */}
          <div className="mt-6 pt-6 border-t border-border/50">
            <p className="text-text opacity-65 dark:opacity-100 text-xs text-center">
              Developed by Andre Bouvier & Aaron Castellellanos
            </p>
            <p className="text-text opacity-55 dark:opacity-100 text-xs text-center mt-1">
              ENGR696/697 SFSU
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer Modal */}
      {showDisclaimer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          onClick={() => setShowDisclaimer(false)}
        >
          <div
            className="bg-background border border-border rounded-lg shadow-xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-text text-xl font-bold">Disclaimer</h3>
              <button
                onClick={() => setShowDisclaimer(false)}
                className="text-text opacity-70 hover:opacity-100 transition-opacity"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-text opacity-90 dark:opacity-100">
              This application is not to be used as financial advice and is a test.
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowDisclaimer(false)}
                className="bg-primary-dark text-text-secondary px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
