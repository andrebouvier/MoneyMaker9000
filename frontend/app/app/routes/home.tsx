{/*
  This file to used for metadata, if wanting to change the home page, change the Welcome component.
*/}

import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MoneyMaker 9000" },
    { name: "description", content: "Engineering 697 Project for SFSU" },
  ];
}

export default function Home() {
  return <Welcome />;
}
