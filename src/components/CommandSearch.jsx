import { useState, useEffect, useRef } from "react";

export default function CommandSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState(["looking for a keeper"]);

  const inputRef = useRef(null);
  const desktopMq = useRef(window.matchMedia("(min-width:1024px)"));

  const isDesktop = () => desktopMq.current.matches;
  const toggle = () => setOpen((v) => (isDesktop() ? !v : false));

  useEffect(() => {
    const handleKey = (e) => {
      if (!isDesktop()) return;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggle();
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const submitQuery = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setRecent((p) =>
      [query.trim(), ...p.filter((i) => i !== query.trim())].slice(0, 7)
    );
    setQuery("");
  };

  return (
    <>
      <button
        onClick={toggle}
        className="hidden lg:flex fixed top-5 right-1/4 z-40 items-center gap-2 bg-yellow/90 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
        <svg
          className="h-4 w-4 text-black"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
          />
        </svg>
        <span className="text-sm text-black">&#8984; K</span>
      </button>

      {open && (
        <>
          <div
            onClick={toggle}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-lg bg-almostblack/90 backdrop-blur-md rounded-2xl p-6 z-40 flex flex-col gap-6">
            <form
              onSubmit={submitQuery}
              className="flex items-center gap-3">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…"
                className="flex-1 bg-transparent outline-none text-beige placeholder-gray-500"
              />
              <span className="text-sm text-gray-400">Esc</span>
            </form>

            <div className="flex flex-col">
              <span className="text-gray-400 font-redhatmono mb-1 ml-auto">
                recent
              </span>
              <ul className="divide-y divide-white/5">
                {recent.map((item) => (
                  <li
                    key={item}
                    className="flex items-center justify-between py-3 px-2 hover:bg-white/5 rounded-lg">
                    <span className="text-beige text-sm">{item}</span>
                    <button
                      onClick={() =>
                        setRecent((p) => p.filter((i) => i !== item))
                      }
                      className="text-gray-400 hover:text-yellow text-sm">
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}
