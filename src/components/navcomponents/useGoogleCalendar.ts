// useGoogleCalendar.ts
import { useEffect, useMemo, useState } from "react";
import { useGoogleAuth } from "./googleAuth";

interface Booking {
  id: string;
  title: string;
  time: string;
  type: "pickup" | "slot";
}

export function useGoogleCalendar(currentDate: Date) {
  const { signedIn, signIn } = useGoogleAuth();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // date window = the six-week grid you already render
  const timeMin = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  timeMin.setDate(timeMin.getDate() - timeMin.getDay());
  const timeMax = new Date(timeMin);
  timeMax.setDate(timeMax.getDate() + 41);

  useEffect(() => {
    if (!signedIn) return;
    (async () => {
      setLoading(true);
      const res = await gapi.client.calendar.events.list({
        calendarId: "primary",
        singleEvents: true,
        orderBy: "startTime",
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        maxResults: 2500,
      });
      setEvents(res.result.items || []);
      setLoading(false);
    })();
  }, [signedIn, timeMin.toISOString(), timeMax.toISOString()]);

  const bookings: Record<string, Booking[]> = useMemo(() => {
    const map: Record<string, Booking[]> = {};
    events.forEach((ev) => {
      const start = ev.start?.dateTime || ev.start?.date; // all-day vs timed
      if (!start) return;
      const key = new Date(start).toISOString().split("T")[0];
      (map[key] ||= []).push({
        id: ev.id!,
        title: ev.summary || "(untitled)",
        time: formatTime(ev),
        type: "slot", // or derive from ev.colorId / ev.eventType
      });
    });
    return map;
  }, [events]);

  function formatTime(ev: any) {
    const s = ev.start?.dateTime;
    const e = ev.end?.dateTime;
    if (!s || !e) return "All day";
    const st = new Date(s).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const et = new Date(e).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${st} – ${et}`;
  }

  return { bookings, loading, signedIn, signIn };
}
