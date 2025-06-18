import HomePage from "~/home/homepage";
import type { Route } from "../+types/root";
import Explore from "~/home/explore";
import { Footer } from "~/home/footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div>
      <HomePage />
      <Explore />
      <Footer />
    </div>
  );
}
