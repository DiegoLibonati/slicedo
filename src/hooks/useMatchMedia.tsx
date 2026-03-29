import { useEffect, useMemo, useState } from "react";

import { UseMatchMedia } from "@/types/hooks";

export function useMediaQuery(mediaQueryString: string): UseMatchMedia {
  const queryString = removeReservedMediaKeyWord(mediaQueryString);

  const query = useMemo(() => window.matchMedia(queryString), [queryString]);
  const [matches, setMatches] = useState<boolean>(query.matches);

  useEffect(() => {
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    query.addEventListener("change", (e) => listener(e));
    return () => query.removeEventListener("change", (e) => listener(e));
  }, [query]);

  return { matches: matches };
}

function removeReservedMediaKeyWord(mediaQueryString: string): string {
  return mediaQueryString.replace("@media", "").trim();
}
