import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const API = import.meta.env.VITE_BACKEND_URL_API;

// Generate a session ID for this browser tab
const getSessionId = () => {
  let sid = sessionStorage.getItem("tsp_sid");
  if (!sid) { sid = Math.random().toString(36).slice(2) + Date.now().toString(36); sessionStorage.setItem("tsp_sid", sid); }
  return sid;
};

export default function PageTracker() {
  const location = useLocation();
  const lastTrackedPath = useRef(null);
  const lastTrackedTime = useRef(0);
  const trackedEvents = useRef([]);
  const delegationAttached = useRef(false);

  // Ensure session ID is initialized early
  useEffect(() => {
    getSessionId();
  }, []);

  // Track page view on every route change
  useEffect(() => {
    const path = location.pathname;
    // Don't track admin pages
    if (path.startsWith("/admin")) return;

    // Deduplicate: skip if same path was tracked within the last 2 seconds
    const now = Date.now();
    if (lastTrackedPath.current === path && now - lastTrackedTime.current < 2000) return;
    lastTrackedPath.current = path;
    lastTrackedTime.current = now;

    fetch(`${API}/tracking/pageview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path,
        referrer: document.referrer || null,
        session_id: getSessionId(),
      }),
    }).catch(() => {});
  }, [location.pathname]);

  // Load tracked event definitions and set up delegation
  useEffect(() => {
    fetch(`${API}/tracking/events`)
      .then(r => r.json())
      .then(events => {
        trackedEvents.current = events;
        attachDelegatedListeners(events, delegationAttached);
      })
      .catch(() => {});

    // Cleanup: remove delegated listeners on unmount
    return () => {
      if (delegationAttached.current) {
        delegationAttached.current = false;
      }
    };
  }, []);

  return null;
}

// Use event delegation on document.body so listeners are attached once
// and automatically handle dynamically added elements.
function attachDelegatedListeners(events, delegationAttached) {
  if (delegationAttached.current) return;
  delegationAttached.current = true;

  // Group events by event_type for fewer listeners
  const byType = {};
  events.forEach(evt => {
    const type = evt.event_type || "click";
    if (!byType[type]) byType[type] = [];
    byType[type].push(evt);
  });

  Object.entries(byType).forEach(([eventType, evts]) => {
    document.body.addEventListener(eventType, (e) => {
      const path = window.location.pathname;
      if (path.startsWith("/admin")) return;

      evts.forEach(evt => {
        // Check if event should fire on this page
        if (evt.page_match && evt.page_match !== "*") {
          const pattern = evt.page_match.replace(/\*/g, ".*");
          if (!new RegExp(`^${pattern}$`).test(path)) return;
        }

        // Check if the clicked element (or an ancestor) matches the selector
        if (e.target.closest(evt.selector)) {
          fetch(`${API}/tracking/event`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: evt.name,
              page: path,
              session_id: getSessionId(),
            }),
          }).catch(() => {});
        }
      });
    });
  });
}
