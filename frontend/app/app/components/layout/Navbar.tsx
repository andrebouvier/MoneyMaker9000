{/*
  Navbar for the Homepage
*/}
import { Link, useNavigate } from "react-router";
import { ThemeToggle } from "./ThemeToggle";
import { auth, googleProvider } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useEffect } from "react";

{/*  Navbar items that are mapped to the navbar */ }
const navItems = [
  { name: "About", href: "#About" },
  { name: "How It Works", href: "#HowItWorks" },
  { name: "Performance/Results", href: "#Performance" },
  { name: "FAQ", href: "#FAQ" },
  { name: "Contact Us", href: "#ContactUs" },
  { name: "Technologies", href: "#Technologies" }
]

export default function Navbar() {
  const navigate = useNavigate();

  async function handleSignIn() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Google sign in failed:", error);
    }
  }

  // Handle initial scroll when page loads with a hash
  useEffect(() => {
    const handleInitialScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.substring(1);
        
        // Special handling for Technologies
        if (targetId === 'Technologies') {
          return; // Handled by Home.tsx
        }

        setTimeout(() => {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            const navbar = document.querySelector('nav');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20;
            window.scrollTo({
              top: Math.max(0, offsetPosition),
              behavior: 'smooth'
            });
          }
        }, 100);
      }
    };

    // Handle initial hash
    handleInitialScroll();

    // Also listen for hash changes from browser navigation
    window.addEventListener('hashchange', handleInitialScroll);
    
    return () => {
      window.removeEventListener('hashchange', handleInitialScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Check if it's a hash link (starts with #)
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1); // Remove the # symbol
      
      // Special handling for Technologies (it uses different logic in Home.tsx)
      if (targetId === 'Technologies') {
        window.location.hash = '#Technologies';
        // Scroll to top since Technologies is a separate view
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Find the target element
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Get navbar height to offset scroll position
        const navbar = document.querySelector('nav');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        
        // Calculate scroll position accounting for navbar
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20; // Extra 20px padding

        // Smooth scroll to the element
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });

        // Update URL hash
        window.history.pushState(null, '', href);
      } else {
        // If element not found immediately, wait a bit for dynamic content
        setTimeout(() => {
          const retryElement = document.getElementById(targetId);
          if (retryElement) {
            const navbar = document.querySelector('nav');
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const elementPosition = retryElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20;
            window.scrollTo({
              top: Math.max(0, offsetPosition),
              behavior: 'smooth'
            });
            window.history.pushState(null, '', href);
          }
        }, 100);
      }
    }
    // If it's not a hash link, let the default behavior handle it
  };

  return (
    <nav className="bg-background border-b border-border fixed w-full z-20 top-0 start-0 transition-all duration-300 ease-in-out">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/public/MoneyMakerLogo.png" className="h-12" alt="Options Trading Bot Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-text transition-colors duration-300 ease-in-out">Money Maker 9000</span>
          </a>

          {/* Navigation Links - Left justified */}
          <div className="hidden md:block">
            <ul className="flex items-center space-x-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-text hover:text-primary px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out cursor-pointer"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right side - Get Started button and mobile menu */}
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <button type="button" className="text-white bg-primary hover:bg-primary-dark focus:ring-4 focus:ring-primary/30 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 focus:outline-none transition-all duration-300 ease-in-out">
            <Link to="/conversation">
              Conversation
            </Link>
          </button>
          <button onClick={handleSignIn} type="button" className="cursor-pointer text-white bg-primary hover:bg-primary-dark focus:ring-4 focus:ring-primary/30 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 focus:outline-none transition-all duration-300 ease-in-out">
            Login
          </button>
          <button type="button" className="text-white bg-primary hover:bg-primary-dark focus:ring-4 focus:ring-primary/30 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 focus:outline-none transition-all duration-300 ease-in-out">
            <Link to="/dashboard">
              Dev
            </Link>
          </button>
          <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-text-secondary rounded-lg md:hidden hover:bg-surface focus:outline-none focus:ring-2 focus:ring-border transition-all duration-300 ease-in-out">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-background-secondary" id="navbar-sticky">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-text hover:text-primary block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ease-in-out cursor-pointer"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
