{/*
  Hero (very top of page) component for homepage
*/}
import react from "react";


export function Hero() {

    



  return (
    <div className="flex flex-col items-center justify-center bg-background py-20 md:py-32 px-4 min-h-[60vh] relative">
      <h1 className="text-text text-center text-4xl font-extrabold justify-center tracking-wider">Automate your Options Trading</h1>
      <p className="text-text text-center text-lg justify-center">A tool to to enable retail traders to automate their options trading.</p>
    </div>
  );
}