import { cityNameFromIana } from "@/lib/timezone";

export interface TimezoneOption {
  id: string;
  label: string; // shown in dropdown, e.g. "India Standard Time (IST)"
  abbreviation: string; // seed abbreviation for search; DISPLAY should use zoneAbbreviation(timezone) instead
  timezone: string; // IANA id
  keywords: string; // extra search terms (city names, country)
  group: "abbreviation" | "city";
  /** True for a DST-variant duplicate (e.g. "edt") that's kept resolvable for old saved
   * preferences but hidden from the dropdown in favor of its DST-neutral canonical entry. */
  hidden?: boolean;
}

export const TIMEZONE_OPTIONS: TimezoneOption[] = [
  { id: "ist", label: "India Standard Time (IST)", abbreviation: "IST", timezone: "Asia/Kolkata", keywords: "india mumbai delhi bangalore chennai new delhi bengaluru", group: "abbreviation" },
  { id: "est", label: "Eastern Time (ET)", abbreviation: "EST", timezone: "America/New_York", keywords: "new york eastern us usa east coast washington boston edt est", group: "abbreviation" },
  { id: "edt", label: "Eastern Time (ET)", abbreviation: "EDT", timezone: "America/New_York", keywords: "new york eastern daylight us usa", group: "abbreviation", hidden: true },
  { id: "cst", label: "Central Time (CT)", abbreviation: "CST", timezone: "America/Chicago", keywords: "chicago central us usa houston dallas cdt cst", group: "abbreviation" },
  { id: "cdt", label: "Central Time (CT)", abbreviation: "CDT", timezone: "America/Chicago", keywords: "chicago central daylight us usa", group: "abbreviation", hidden: true },
  { id: "pst", label: "Pacific Time (PT)", abbreviation: "PST", timezone: "America/Los_Angeles", keywords: "los angeles pacific us usa san francisco seattle california pdt pst", group: "abbreviation" },
  { id: "pdt", label: "Pacific Time (PT)", abbreviation: "PDT", timezone: "America/Los_Angeles", keywords: "los angeles pacific daylight us usa california", group: "abbreviation", hidden: true },
  { id: "mst", label: "Mountain Time (MT)", abbreviation: "MST", timezone: "America/Denver", keywords: "denver mountain us usa phoenix arizona mdt mst", group: "abbreviation" },
  { id: "mdt", label: "Mountain Time (MT)", abbreviation: "MDT", timezone: "America/Denver", keywords: "denver mountain daylight us usa", group: "abbreviation", hidden: true },
  { id: "ast", label: "Atlantic Time (AT)", abbreviation: "AST", timezone: "America/Halifax", keywords: "halifax atlantic canada puerto rico", group: "abbreviation" },
  { id: "gmt", label: "UK Time (London)", abbreviation: "GMT", timezone: "Europe/London", keywords: "london uk united kingdom england bst gmt", group: "abbreviation" },
  { id: "bst", label: "UK Time (London)", abbreviation: "BST", timezone: "Europe/London", keywords: "london uk united kingdom england summer", group: "abbreviation", hidden: true },
  { id: "utc", label: "Coordinated Universal Time (UTC)", abbreviation: "UTC", timezone: "UTC", keywords: "universal coordinated zulu", group: "abbreviation" },
  { id: "cet", label: "Central European Time (CET)", abbreviation: "CET", timezone: "Europe/Paris", keywords: "paris france berlin germany madrid spain rome italy amsterdam europe cest cet", group: "abbreviation" },
  { id: "cest", label: "Central European Time (CET)", abbreviation: "CEST", timezone: "Europe/Paris", keywords: "paris france berlin germany madrid spain rome italy amsterdam europe summer", group: "abbreviation", hidden: true },
  { id: "eet", label: "Eastern European Time (EET)", abbreviation: "EET", timezone: "Europe/Athens", keywords: "athens greece cairo egypt helsinki eest eet", group: "abbreviation" },
  { id: "eest", label: "Eastern European Time (EET)", abbreviation: "EEST", timezone: "Europe/Athens", keywords: "athens greece cairo egypt helsinki summer", group: "abbreviation", hidden: true },
  { id: "jst", label: "Japan Standard Time (JST)", abbreviation: "JST", timezone: "Asia/Tokyo", keywords: "tokyo japan osaka", group: "abbreviation" },
  { id: "kst", label: "Korea Standard Time (KST)", abbreviation: "KST", timezone: "Asia/Seoul", keywords: "seoul korea south korea", group: "abbreviation" },
  { id: "sgt", label: "Singapore Time (SGT)", abbreviation: "SGT", timezone: "Asia/Singapore", keywords: "singapore", group: "abbreviation" },
  { id: "aest", label: "Australian Eastern Time (AET)", abbreviation: "AEST", timezone: "Australia/Sydney", keywords: "sydney australia melbourne brisbane canberra aedt aest", group: "abbreviation" },
  { id: "aedt", label: "Australian Eastern Time (AET)", abbreviation: "AEDT", timezone: "Australia/Sydney", keywords: "sydney australia melbourne canberra summer daylight", group: "abbreviation", hidden: true },
  { id: "nzst", label: "New Zealand Time (NZT)", abbreviation: "NZST", timezone: "Pacific/Auckland", keywords: "auckland new zealand wellington nzdt nzst", group: "abbreviation" },
  { id: "nzdt", label: "New Zealand Time (NZT)", abbreviation: "NZDT", timezone: "Pacific/Auckland", keywords: "auckland new zealand wellington summer daylight", group: "abbreviation", hidden: true },
  { id: "dubai", label: "Gulf Standard Time (GST)", abbreviation: "GST", timezone: "Asia/Dubai", keywords: "dubai uae united arab emirates abu dhabi", group: "abbreviation" },
  { id: "hkt", label: "Hong Kong Time (HKT)", abbreviation: "HKT", timezone: "Asia/Hong_Kong", keywords: "hong kong", group: "abbreviation" },
  { id: "ict", label: "Indochina Time (ICT)", abbreviation: "ICT", timezone: "Asia/Bangkok", keywords: "bangkok thailand vietnam", group: "abbreviation" },
  { id: "wib", label: "Western Indonesia Time (WIB)", abbreviation: "WIB", timezone: "Asia/Jakarta", keywords: "jakarta indonesia", group: "abbreviation" },
  { id: "wita", label: "Central Indonesia Time (WITA)", abbreviation: "WITA", timezone: "Asia/Makassar", keywords: "makassar bali indonesia denpasar", group: "abbreviation" },
  { id: "wit", label: "Eastern Indonesia Time (WIT)", abbreviation: "WIT", timezone: "Asia/Jayapura", keywords: "jayapura papua indonesia", group: "abbreviation" },
  { id: "pkt", label: "Pakistan Standard Time (PKT)", abbreviation: "PKT", timezone: "Asia/Karachi", keywords: "karachi pakistan islamabad", group: "abbreviation" },
  { id: "bdt", label: "Bangladesh Time (BST)", abbreviation: "BDT", timezone: "Asia/Dhaka", keywords: "dhaka bangladesh", group: "abbreviation" },
  { id: "msk", label: "Moscow Time (MSK)", abbreviation: "MSK", timezone: "Europe/Moscow", keywords: "moscow russia", group: "abbreviation" },
  { id: "sast", label: "South Africa Time (SAST)", abbreviation: "SAST", timezone: "Africa/Johannesburg", keywords: "johannesburg cape town south africa", group: "abbreviation" },
  { id: "brt", label: "Brasília Time (BRT)", abbreviation: "BRT", timezone: "America/Sao_Paulo", keywords: "sao paulo brazil rio de janeiro brasilia", group: "abbreviation" },
  { id: "art", label: "Argentina Time (ART)", abbreviation: "ART", timezone: "America/Argentina/Buenos_Aires", keywords: "buenos aires argentina", group: "abbreviation" },
  { id: "london", label: "London", abbreviation: "GMT/BST", timezone: "Europe/London", keywords: "uk england united kingdom", group: "city" },
  { id: "paris", label: "Paris", abbreviation: "CET/CEST", timezone: "Europe/Paris", keywords: "france", group: "city" },
  { id: "berlin", label: "Berlin", abbreviation: "CET/CEST", timezone: "Europe/Berlin", keywords: "germany", group: "city" },
  { id: "sydney", label: "Sydney", abbreviation: "AEST/AEDT", timezone: "Australia/Sydney", keywords: "australia", group: "city" },
  { id: "tokyo", label: "Tokyo", abbreviation: "JST", timezone: "Asia/Tokyo", keywords: "japan", group: "city" },
  { id: "singapore", label: "Singapore", abbreviation: "SGT", timezone: "Asia/Singapore", keywords: "", group: "city" },
  { id: "toronto", label: "Toronto", abbreviation: "EST/EDT", timezone: "America/Toronto", keywords: "canada", group: "city" },
  { id: "mexico-city", label: "Mexico City", abbreviation: "CST/CDT", timezone: "America/Mexico_City", keywords: "mexico", group: "city" },
  { id: "los-angeles", label: "Los Angeles", abbreviation: "PST/PDT", timezone: "America/Los_Angeles", keywords: "california us usa", group: "city" },
  { id: "chicago", label: "Chicago", abbreviation: "CST/CDT", timezone: "America/Chicago", keywords: "us usa illinois", group: "city" },
  { id: "new-york", label: "New York", abbreviation: "EST/EDT", timezone: "America/New_York", keywords: "us usa", group: "city" },
  { id: "mumbai", label: "Mumbai", abbreviation: "IST", timezone: "Asia/Kolkata", keywords: "india", group: "city" },
  { id: "san-francisco", label: "San Francisco", abbreviation: "PST/PDT", timezone: "America/Los_Angeles", keywords: "california us usa", group: "city" },
  { id: "seoul", label: "Seoul", abbreviation: "KST", timezone: "Asia/Seoul", keywords: "south korea", group: "city" },
  { id: "shanghai", label: "Shanghai", abbreviation: "CST", timezone: "Asia/Shanghai", keywords: "china beijing", group: "city" },
  { id: "lagos", label: "Lagos", abbreviation: "WAT", timezone: "Africa/Lagos", keywords: "nigeria", group: "city" },
  { id: "cairo", label: "Cairo", abbreviation: "EET", timezone: "Africa/Cairo", keywords: "egypt", group: "city" },
  { id: "nairobi", label: "Nairobi", abbreviation: "EAT", timezone: "Africa/Nairobi", keywords: "kenya", group: "city" },
];

export const TIMEZONE_BY_ID: Record<string, TimezoneOption> = TIMEZONE_OPTIONS.reduce(
  (acc, tz) => {
    acc[tz.id] = tz;
    return acc;
  },
  {} as Record<string, TimezoneOption>
);

/**
 * IANA publishes some zones as backward-compatibility "links" to a canonical
 * zone — e.g. browsers/OSes on older tzdata report "Asia/Calcutta" even though
 * the canonical id is "Asia/Kolkata". Normalize the common ones so detection
 * still snaps to our curated entry instead of falling through to a synthesized one.
 */
const LEGACY_TZ_ALIASES: Record<string, string> = {
  "Asia/Calcutta": "Asia/Kolkata",
  "Asia/Rangoon": "Asia/Yangon",
  "Europe/Kiev": "Europe/Kyiv",
  "America/Indianapolis": "America/Indiana/Indianapolis",
};

/**
 * Resolves any id to a TimezoneOption — curated ids hit TIMEZONE_BY_ID directly;
 * anything else is treated as a raw IANA zone (e.g. "Asia/Kathmandu") and a
 * TimezoneOption is synthesized on the fly, so detection works for every
 * IANA zone, not just the ~50 we've curated.
 */
export function resolveTimezoneOption(idOrIana: string): TimezoneOption | undefined {
  const curatedById = TIMEZONE_BY_ID[idOrIana];
  if (curatedById) return curatedById;

  const canonicalIana = LEGACY_TZ_ALIASES[idOrIana] ?? idOrIana;
  const curatedByZone = TIMEZONE_OPTIONS.find(
    (tz) => tz.timezone === canonicalIana && tz.group === "abbreviation" && !tz.hidden
  );
  if (curatedByZone) return curatedByZone;

  if (!canonicalIana.includes("/") && canonicalIana !== "UTC") return undefined;
  try {
    Intl.DateTimeFormat(undefined, { timeZone: canonicalIana });
  } catch {
    return undefined;
  }
  const city = cityNameFromIana(canonicalIana);
  return {
    id: canonicalIana,
    label: city,
    abbreviation: city,
    timezone: canonicalIana,
    keywords: canonicalIana.replace(/[/_]/g, " "),
    group: "city",
  };
}

export type Region = "india" | "us" | "europe" | "other";

export function getRegionForTimezone(iana: string): Region {
  if (iana === "Asia/Kolkata" || iana === "Asia/Calcutta") return "india";
  if (iana.startsWith("America/")) return "us";
  if (iana.startsWith("Europe/")) return "europe";
  return "other";
}

/** Ordered list of suggested "To" zone ids per region, most relevant first. */
const SUGGESTIONS_BY_REGION: Record<Region, string[]> = {
  india: ["est", "cst", "pst", "gmt", "utc", "mst", "london", "dubai", "singapore"],
  us: ["ist", "gmt", "utc", "london", "dubai", "singapore", "tokyo"],
  europe: ["ist", "est", "pst", "gmt", "utc"],
  other: ["ist", "est", "gmt", "utc", "singapore"],
};

/** Smart default "To" zone plus quick-preset pairs for a freshly detected "From" zone. */
export function getSmartDefaults(fromId: string): { toId: string; presets: { from: string; to: string }[] } {
  const fromTz = resolveTimezoneOption(fromId);
  const region = fromTz ? getRegionForTimezone(fromTz.timezone) : "other";
  const suggestions = SUGGESTIONS_BY_REGION[region].filter((id) => id !== fromId);
  const toId = suggestions[0] ?? "utc";
  const presets = suggestions.slice(0, 5).map((to) => ({ from: fromId, to }));
  return { toId, presets };
}
