import EndPage from "./pages/end";
import FactsPage from "./pages/facts";
import FinderPage from "./pages/finder";
import LandingPage from "./pages/landing";

export default function HomePage() {
  return (
    <div className="flex flex-col overflow-hidden bg-almostwhite">
      <section>
        <LandingPage />
      </section>
      <section className="bg-green">
        <FinderPage />
      </section>
      <section className="bg-beige">
        <FactsPage />
      </section>
      <section>
        <EndPage />
      </section>
    </div>
  );
}
