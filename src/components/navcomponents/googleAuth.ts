/// <reference types="vite/client" />

// googleAuth.ts
import { useEffect, useState } from "react";

// Declare global types for gapi
declare global {
  interface Window {
    gapi: any;
  }
  const gapi: any;
}

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID!;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY!;
const DISCOVERY =
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

export function useGoogleAuth() {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const load = () =>
      gapi.load("client:auth2", async () => {
        await gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: [DISCOVERY],
          scope: SCOPES,
        });
        const auth = gapi.auth2.getAuthInstance();
        setSignedIn(auth.isSignedIn.get());
        auth.isSignedIn.listen(setSignedIn);
      });

    // inject the gapi script once
    if (!window.gapi) {
      const s = document.createElement("script");
      s.src = "https://apis.google.com/js/api.js";
      s.onload = load;
      document.body.appendChild(s);
    } else load();
  }, []);

  const signIn = () => gapi.auth2.getAuthInstance().signIn();
  const signOut = () => gapi.auth2.getAuthInstance().signOut();

  return { signedIn, signIn, signOut };
}
