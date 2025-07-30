// Calendar.tsx
import React, { useState, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

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
  bookings?: Record<string, Booking[]>;
}

export default function Calendar({
  isOpen,
  onClose,
  onDateSelect,
  bookings = {},
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const overlayRef = React.useRef<HTMLDivElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const today = useMemo(() => new Date(), []);

  // optimized calendar generation with useMemo
  const calendarDays = useMemo((): CalendarDay[] => {
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

    // Generate 42 days (6 weeks) - optimized loop
    for (let i = 0; i < 42; i++) {
      const dateKey = current.toISOString().split("T")[0];
      const dayBookings = bookings[dateKey];

      days.push({
        date: new Date(current),
        isCurrentMonth: current.getMonth() === currentDate.getMonth(),
        isToday: current.toDateString() === today.toDateString(),
        hasBookings: Boolean(dayBookings?.length),
        bookings: dayBookings || [],
      });

      current.setDate(current.getDate() + 1);
    }

    return days;
  }, [currentDate, bookings, today]);

  // optimized animation with useGSAP
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
          if (overlayRef.current) {
            gsap.set(overlayRef.current, { display: "none" });
          }
        },
      });
    }
  }, [isOpen]);

  const navigateMonth = useCallback((direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + (direction === "prev" ? -1 : 1));
      return newDate;
    });
  }, []);

  // Optimized hover handlers
  const handleDateHover = useCallback((day: CalendarDay) => {
    if (day.hasBookings) {
      setHoveredDate(day.date);
    }
  }, []);

  const handleDateLeave = useCallback(() => {
    setHoveredDate(null);
  }, []);

  const handleDateClick = useCallback(
    (day: CalendarDay) => {
      setSelectedDate(day.date);
      onDateSelect?.(day.date);
    },
    [onDateSelect]
  );

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) {
        onClose();
      }
    },
    [onClose]
  );

  const formatMonth = useCallback((date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long" });
  }, []);

  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Get bookings for display (memoized)
  const displayDate = hoveredDate || selectedDate;
  const displayBookings = useMemo(() => {
    if (!displayDate) return [];
    return (
      calendarDays.find(
        (day) => day.date.toDateString() === displayDate.toDateString()
      )?.bookings || []
    );
  }, [displayDate, calendarDays]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/50 items-center justify-center z-50 hidden"
      onClick={handleOverlayClick}>
      <div
        ref={cardRef}
        className="w-[90vw] max-w-4xl h-[80vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Compact Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-black border-b border-gray-800">
          <div className="flex items-center gap-4">
            <button
              className="w-8 h-8 flex items-center justify-center text-white text-lg"
              onClick={() => navigateMonth("prev")}
              aria-label="Previous month">
              ‹
            </button>

            <h2 className="text-xl font-unbounded font-bold text-white">
              {formatMonth(currentDate)}
            </h2>

            <button
              className="w-8 h-8 flex items-center justify-center  text-white text-lg"
              onClick={() => navigateMonth("next")}
              aria-label="Next month">
              ›
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-white text-lg"
            aria-label="Close calendar">
            ×
          </button>
        </div>

        {/* Compact Week Header */}
        <div className="grid grid-cols-7 bg-yellow border-b border-gray-800">
          {weekDays.map((day) => (
            <div
              key={day}
              className="px-2 py-2 text-center font-redhatmono font-medium text-xs text-black uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Compact Calendar Grid - Small Boxes */}
          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-7 gap-0.5 bg-almostblack h-full">
              {calendarDays.map((day, index) => (
                <div
                  key={`${day.date.getTime()}-${index}`}
                  className={`
                    bg-black min-h-[70px] max-h-[70px] cursor-pointer relative flex flex-col items-center justify-start
                    rounded-2xl transition-all transform duration-50
                    ${
                      !day.isCurrentMonth
                        ? "bg-gray-800 text-gray-600"
                        : "text-white"
                    }
                    
                    ${
                      hoveredDate?.toDateString() === day.date.toDateString()
                        ? "bg-gray-800 border-gray-600"
                        : ""
                    }
                    ${
                      selectedDate?.toDateString() === day.date.toDateString()
                        ? "bg-yellow border-gray-500"
                        : !(
                            hoveredDate?.toDateString() ==
                            day.date.toDateString()
                          )
                        ? "hover:bg-darkgreen"
                        : ""
                    }
                  `}
                  onMouseEnter={() => handleDateHover(day)}
                  onMouseLeave={handleDateLeave}
                  onClick={() => handleDateClick(day)}>
                  <span
                    className={`
                    text-sm font-unbounded font-medium mb-1
                    ${
                      day.isToday
                        ? "bg-yellow text-black w-6 h-6 rounded-full flex items-center justify-center text-xs"
                        : ""
                    }
                  `}>
                    {day.date.getDate()}
                  </span>

                  {day.hasBookings && (
                    <div className="flex gap-1 flex-wrap">
                      {day.bookings?.slice(0, 2).map((booking, idx) => (
                        <div
                          key={`${booking.id}-${idx}`}
                          className={`
                            w-1.5 h-1.5 rounded-full
                            ${booking.type === "slot" ? "bg-blue-500" : ""}
                            ${booking.type === "pickup" ? "bg-green-500" : ""}
                          `}
                        />
                      ))}
                      {(day.bookings?.length ?? 0) > 2 && (
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Compact Bottom Panel */}
          <div className="bg-black border-t border-gray-800 p-4 h-[160px] overflow-hidden">
            {displayDate ? (
              <>
                <div className="mb-3">
                  <h3 className="text-lg font-unbounded font-medium text-white mb-1">
                    {displayDate.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </h3>
                  <p className="text-gray-400 text-xs">
                    {displayBookings.length} booking
                    {displayBookings.length !== 1 ? "s" : ""}
                  </p>
                </div>

                {displayBookings.length > 0 ? (
                  <div className="space-y-2 max-h-20 overflow-y-auto">
                    {displayBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between bg-gray-800 rounded-md p-2 hover:bg-gray-700 transition-colors duration-150">
                        <div className="flex items-center space-x-2">
                          <div
                            className={`
                            w-3 h-3 rounded-full flex-shrink-0
                            ${booking.type === "pickup" ? "bg-blue-500" : ""}
                            ${booking.type === "slot" ? "bg-green-500" : ""}
                          `}
                          />
                          <div className="min-w-0">
                            <div className="text-white font-polysans font-medium text-sm truncate">
                              {booking.title}
                            </div>
                            <div className="text-gray-400 text-xs">
                              {booking.time}
                            </div>
                          </div>
                        </div>
                        <div className="text-gray-500 text-xs uppercase tracking-wide">
                          {booking.type}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div className="text-gray-600 text-sm">No bookings</div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-600 text-sm">Select a date</div>
                <div className="text-gray-500 text-xs">View your bookings</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
