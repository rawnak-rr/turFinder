import FactsPage from "./pages/facts";
import FinderPage from "./pages/finder";
import LandingPage from "./pages/landing";

export default function HomePage() {
  return (
    <div className="flex flex-col overflow-hidden">
      <section>
        <LandingPage />
      </section>
      <section>
        <FinderPage />
      </section>
      <section>
        <FactsPage />
      </section>
    </div>
  );
}
