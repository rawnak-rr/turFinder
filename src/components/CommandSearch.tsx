import { useState, useEffect, useRef, FormEvent } from "react";

export default function CommandSearch() {
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [recent, setRecent] = useState<string[]>([
    "looking for a keeper",
    "book a turf",
    "looking for group",
  ]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const screenRef = useRef<MediaQueryList>(
    window.matchMedia("(min-width:1024px)")
  );

  const isDesktop = (): boolean => screenRef.current.matches;
  const toggle = (): void => setOpen((v) => (isDesktop() ? !v : false));

  const isMacOS = (): boolean => /Mac/i.test(navigator.userAgent);

  useEffect(() => {
    const handleKey = (keyPress: KeyboardEvent): void => {
      if (!isDesktop()) return;
      if ((keyPress.metaKey || keyPress.ctrlKey) && keyPress.key === "k") {
        keyPress.preventDefault();
        toggle();
      }
      if (keyPress.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const submitQuery = (e: FormEvent<HTMLFormElement>): void => {
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
        className="hidden lg:flex fixed top-5 right-1/4 z-40 items-center gap-2 px-3 py-1 cursor-pointer
                 bg-yellow/90 rounded-full backdrop-blur-md border border-white/10">
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
        <span className="text-sm text-black font-redhatmono">
          {isMacOS() ? <>&#8984;</> : "Ctrl"} K
        </span>
      </button>

      {open && (
        <>
          <div
            onClick={toggle}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          />
          <div
            className="fixed flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-lg p-6 z-40 gap-6
                     bg-almostblack/90 backdrop-blur-md rounded-2xl">
            <form
              onSubmit={submitQuery}
              className="flex items-center gap-3">
              <svg
                className="h-5 w-5 text-almostwhite/50"
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
                placeholder="search…"
                className="flex-1 bg-transparent outline-none text-beige placeholder-almostwhite/50"
              />
              <span
                onClick={toggle}
                className="text-sm text-almostwhite/45 hover:text-yellow cursor-pointer">
                Esc
              </span>
            </form>

            <div className="flex flex-col">
              <span className="text-almostwhite/45 font-redhatmono mb-1 mr-auto cursor-default">
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
                      className="text-almostwhite/45 hover:text-yellow text-sm cursor-pointer">
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
