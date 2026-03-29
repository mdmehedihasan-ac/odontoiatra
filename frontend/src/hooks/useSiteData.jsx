import { createContext, useContext, useEffect, useState } from "react";

const SiteDataContext = createContext({ data: null, loading: true, error: null });

export function SiteDataProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/site_data.json", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setData(json);
        // Apply scraped palette as CSS custom properties
        if (json.palette) {
          const root = document.documentElement;
          const { primary, secondary, accent } = json.palette;
          if (primary) root.style.setProperty("--scraped-primary", primary);
          if (secondary) root.style.setProperty("--scraped-secondary", secondary);
          if (accent) root.style.setProperty("--scraped-accent", accent);
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.warn("[SiteData] Could not load API data:", err.message);
          setError(err.message);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return (
    <SiteDataContext.Provider value={{ data, loading, error }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  return useContext(SiteDataContext);
}
