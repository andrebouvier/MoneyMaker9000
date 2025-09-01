{/*
  This is the dashboard page for the app that the user will see after logging in.

  TODO:
  -Create dashboard layout
  -Find component that will display stock data and that will display portfolio data
*/}
import type { Route } from "./+types/app";
import Navbar from "../components/layout/Navbar";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
  ];
}

export default function dashboard() {
  return (
    <div>
      <Navbar />
      <body className="bg-gray-100 flex items-center justify-center min-h-screen p-4">

        <div className="bg-white rounded-xl shadow-2x1 p-6 md:p-10 w-full max-w-5xl">
          <header className="mb-6 md:mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Welcome to the Dashboard
            </h1>
            <p className="text-gray-500">
              Visual Sample
            </p>
          </header>

          <div className="chart-container relatice w-full h-80 md:h-96">
          </div>

          <div className="mt-8 flex justify-center">
            <button
              // onclick={() => setData()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300 transform hover:scale-105"
            >
              Refresh Data
            </button>
          </div>
        </div>
      </body>
    </div>
  );
}
