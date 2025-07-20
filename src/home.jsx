import FactsPage from "./facts";
import FinderPage from "./finder";
import LandingPage from "./landing";

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
