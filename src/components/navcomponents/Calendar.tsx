// Calendar.tsx
import React, { useState, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useGoogleCalendar } from "./useGoogleCalendar";

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasBookings?: boolean;
  bookings?: Booking[];
}

interface Booking {
  id: string;
  title: string;
  time: string;
  type: "pickup" | "slot";
}

interface CalendarProps {
  isOpen: boolean;
  onClose: () => void;
  onDateSelect?: (date: Date) => void;
  bookings?: Record<string, Booking[]>; // Optional prop for sample data
}

export default function Calendar({
  isOpen,
  onClose,
  onDateSelect,
  bookings: propBookings = {},
}: CalendarProps) {
  // ──────────────────────────── local UI state ────────────────────────────
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // ─────────────────────────── Google Calendar data ───────────────────────
  const { bookings, loading, signedIn, signIn } =
    useGoogleCalendar(currentDate);

  // ───────────────────────── refs for GSAP animation ──────────────────────
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const today = useMemo(() => new Date(), []);

  // ───────────────────────── calendar grid generation ─────────────────────
  const calendarDays = useMemo<CalendarDay[]>(() => {
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const firstDayOfCalendar = new Date(firstDayOfMonth);
    firstDayOfCalendar.setDate(
      firstDayOfCalendar.getDate() - firstDayOfMonth.getDay()
    );

    const days: CalendarDay[] = [];
    const current = new Date(firstDayOfCalendar);

    for (let i = 0; i < 42; i++) {
      const dateKey = current.toISOString().split("T")[0];
      // Merge Google Calendar bookings with prop bookings
      const googleBookings = bookings[dateKey] || [];
      const propDayBookings = propBookings[dateKey] || [];
      const allBookings = [...googleBookings, ...propDayBookings];

      days.push({
        date: new Date(current),
        isCurrentMonth: current.getMonth() === currentDate.getMonth(),
        isToday: current.toDateString() === today.toDateString(),
        hasBookings: Boolean(allBookings.length),
        bookings: allBookings,
      });

      current.setDate(current.getDate() + 1);
    }

    return days;
  }, [currentDate, bookings, propBookings, today]);

  // ──────────────────────────── GSAP open/close ───────────────────────────
  useGSAP(() => {
    if (isOpen) {
      gsap.set(overlayRef.current, { display: "flex" });
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: "power2.out" }
      );
      gsap.fromTo(
        cardRef.current,
        { scale: 0.9, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.2)" }
      );
    } else {
      gsap.to(cardRef.current, {
        scale: 0.9,
        opacity: 0,
        y: 20,
        duration: 0.2,
        ease: "power2.in",
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          if (overlayRef.current)
            gsap.set(overlayRef.current, { display: "none" });
        },
      });
    }
  }, [isOpen]);

  // ────────────────────────────── handlers ────────────────────────────────
  const navigateMonth = useCallback((direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + (direction === "prev" ? -1 : 1));
      return d;
    });
  }, []);

  const handleDateHover = useCallback(
    (day: CalendarDay) => day.hasBookings && setHoveredDate(day.date),
    []
  );
  const handleDateLeave = useCallback(() => setHoveredDate(null), []);

  const handleDateClick = useCallback(
    (day: CalendarDay) => {
      setSelectedDate(day.date);
      onDateSelect?.(day.date);
    },
    [onDateSelect]
  );

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) onClose();
    },
    [onClose]
  );

  const formatMonth = (date: Date) =>
    date.toLocaleDateString("en-US", { month: "long" });

  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // ─────────────────────────── bookings for panel ─────────────────────────
  const displayDate = hoveredDate || selectedDate;
  const displayBookings = useMemo(() => {
    if (!displayDate) return [];
    return (
      calendarDays.find(
        (d) => d.date.toDateString() === displayDate.toDateString()
      )?.bookings || []
    );
  }, [displayDate, calendarDays]);

  // ─────────────────────────────── render ─────────────────────────────────
  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/70 items-center justify-center z-50 hidden"
      onClick={handleOverlayClick}>
      <div
        ref={cardRef}
        className="w-[90vw] max-w-4xl h-[80vh] bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center gap-4">
            <button
              className="w-10 h-10 flex items-center justify-center text-white text-xl hover:bg-gray-700 rounded-lg transition-colors"
              onClick={() => navigateMonth("prev")}
              aria-label="Previous month">
              ‹
            </button>

            <h2 className="text-xl font-bold text-white min-w-[200px]">
              {formatMonth(currentDate)} {currentDate.getFullYear()}
            </h2>

            <button
              className="w-10 h-10 flex items-center justify-center text-white text-xl hover:bg-gray-700 rounded-lg transition-colors"
              onClick={() => navigateMonth("next")}
              aria-label="Next month">
              ›
            </button>
          </div>

          {/* Google sign-in if needed */}
          {!signedIn ? (
            <button
              onClick={signIn}
              className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors">
              Sign in to Google
            </button>
          ) : (
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-white text-xl hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Close calendar">
              ×
            </button>
          )}
        </div>

        {/* Week header */}
        <div className="grid grid-cols-7 bg-gray-800 border-b border-gray-700">
          {weekDays.map((d) => (
            <div
              key={d}
              className="px-3 py-3 text-center font-medium text-sm text-gray-300 uppercase tracking-wider">
              {d}
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Calendar grid */}
          <div className="flex-1 overflow-auto bg-gray-900">
            <div className="grid grid-cols-7 gap-1 p-2 h-full">
              {calendarDays.map((day, i) => (
                <div
                  key={`${day.date.getTime()}-${i}`}
                  className={`
                    min-h-[70px] max-h-[70px] cursor-pointer relative flex flex-col items-center justify-start
                    rounded-2xl transition-all duration-200 border
                    ${
                      !day.isCurrentMonth
                        ? "bg-gray-800 text-gray-500 border-gray-700"
                        : "bg-gray-800 text-white border-gray-600"
                    }
                    ${
                      selectedDate?.toDateString() === day.date.toDateString()
                        ? "bg-green-600 border-green-500 text-white"
                        : hoveredDate?.toDateString() ===
                          day.date.toDateString()
                        ? "bg-green-700 border-green-600 text-white"
                        : "hover:bg-green-700 hover:border-green-600"
                    }
                  `}
                  onMouseEnter={() => handleDateHover(day)}
                  onMouseLeave={handleDateLeave}
                  onClick={() => handleDateClick(day)}>
                  <span
                    className={`
                      text-sm font-medium mb-2
                      ${
                        day.isToday &&
                        selectedDate?.toDateString() !== day.date.toDateString()
                          ? "bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs"
                          : ""
                      }
                    `}>
                    {day.date.getDate()}
                  </span>

                  {day.hasBookings && (
                    <div className="flex gap-1 flex-wrap justify-center">
                      {day.bookings?.slice(0, 3).map((b, idx) => (
                        <div
                          key={`${b.id}-${idx}`}
                          className={`
                            w-2 h-2 rounded-full
                            ${b.type === "slot" ? "bg-blue-400" : ""}
                            ${b.type === "pickup" ? "bg-red-400" : ""}
                          `}
                        />
                      ))}
                      {(day.bookings?.length ?? 0) > 3 && (
                        <div className="w-2 h-2 rounded-full bg-gray-400" />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom panel */}
          <div className="bg-gray-800 border-t border-gray-700 p-4 h-[200px] overflow-hidden">
            {loading ? (
              <div className="text-center py-8 text-gray-400 text-sm">
                Loading events…
              </div>
            ) : displayDate ? (
              <>
                <div className="mb-4">
                  <h3 className="text-lg font-medium text-white mb-1">
                    {displayDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {displayBookings.length} event
                    {displayBookings.length !== 1 ? "s" : ""}
                  </p>
                </div>

                {displayBookings.length > 0 ? (
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {displayBookings.map((b) => (
                      <div
                        key={b.id}
                        className="flex items-center justify-between bg-gray-700 rounded-lg p-3 hover:bg-gray-600 transition-colors duration-150">
                        <div className="flex items-center space-x-2">
                          <div
                            className={`
                              w-3 h-3 rounded-full flex-shrink-0
                              ${b.type === "pickup" ? "bg-red-400" : ""}
                              ${b.type === "slot" ? "bg-blue-400" : ""}
                            `}
                          />
                          <div className="min-w-0">
                            <div className="text-white font-medium text-sm truncate">
                              {b.title}
                            </div>
                            <div className="text-gray-400 text-xs">
                              {b.time}
                            </div>
                          </div>
                        </div>
                        <div className="text-gray-400 text-xs uppercase tracking-wide font-medium">
                          {b.type}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-gray-500 text-sm">
                      No events scheduled
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-500 text-sm">
                  Select a date to view events
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
