{/*
  This is the dashboard page for the app that the user will see after logging in.

  TODO:
  -Create dashboard layout
  -Find component that will display stock data and that will display portfolio data
*/}
import type { Route } from "./+types/app";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Login Dashboard for application" },
  ];
}

export default function dashboard() {
  return (
    <div>Dashboard</div>
  );
}