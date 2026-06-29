export interface TimezoneOption {
  id: string;
  label: string; // shown in dropdown, e.g. "India Standard Time (IST)"
  abbreviation: string;
  timezone: string; // IANA id
  keywords: string; // extra search terms (city names, country)
  group: "abbreviation" | "city";
}

export const TIMEZONE_OPTIONS: TimezoneOption[] = [
  { id: "ist", label: "India Standard Time (IST)", abbreviation: "IST", timezone: "Asia/Kolkata", keywords: "india mumbai delhi bangalore chennai new delhi bengaluru", group: "abbreviation" },
  { id: "est", label: "Eastern Standard Time (EST)", abbreviation: "EST", timezone: "America/New_York", keywords: "new york eastern us usa east coast washington boston", group: "abbreviation" },
  { id: "edt", label: "Eastern Daylight Time (EDT)", abbreviation: "EDT", timezone: "America/New_York", keywords: "new york eastern daylight us usa", group: "abbreviation" },
  { id: "cst", label: "Central Standard Time (CST)", abbreviation: "CST", timezone: "America/Chicago", keywords: "chicago central us usa houston dallas", group: "abbreviation" },
  { id: "cdt", label: "Central Daylight Time (CDT)", abbreviation: "CDT", timezone: "America/Chicago", keywords: "chicago central daylight us usa", group: "abbreviation" },
  { id: "pst", label: "Pacific Standard Time (PST)", abbreviation: "PST", timezone: "America/Los_Angeles", keywords: "los angeles pacific us usa san francisco seattle california", group: "abbreviation" },
  { id: "pdt", label: "Pacific Daylight Time (PDT)", abbreviation: "PDT", timezone: "America/Los_Angeles", keywords: "los angeles pacific daylight us usa california", group: "abbreviation" },
  { id: "mst", label: "Mountain Standard Time (MST)", abbreviation: "MST", timezone: "America/Denver", keywords: "denver mountain us usa phoenix arizona", group: "abbreviation" },
  { id: "mdt", label: "Mountain Daylight Time (MDT)", abbreviation: "MDT", timezone: "America/Denver", keywords: "denver mountain daylight us usa", group: "abbreviation" },
  { id: "ast", label: "Atlantic Standard Time (AST)", abbreviation: "AST", timezone: "America/Halifax", keywords: "halifax atlantic canada puerto rico", group: "abbreviation" },
  { id: "gmt", label: "Greenwich Mean Time (GMT)", abbreviation: "GMT", timezone: "Europe/London", keywords: "london uk united kingdom england", group: "abbreviation" },
  { id: "bst", label: "British Summer Time (BST)", abbreviation: "BST", timezone: "Europe/London", keywords: "london uk united kingdom england summer", group: "abbreviation" },
  { id: "utc", label: "Coordinated Universal Time (UTC)", abbreviation: "UTC", timezone: "UTC", keywords: "universal coordinated zulu", group: "abbreviation" },
  { id: "cet", label: "Central European Time (CET)", abbreviation: "CET", timezone: "Europe/Paris", keywords: "paris france berlin germany madrid spain rome italy amsterdam europe", group: "abbreviation" },
  { id: "cest", label: "Central European Summer Time (CEST)", abbreviation: "CEST", timezone: "Europe/Paris", keywords: "paris france berlin germany madrid spain rome italy amsterdam europe summer", group: "abbreviation" },
  { id: "eet", label: "Eastern European Time (EET)", abbreviation: "EET", timezone: "Europe/Athens", keywords: "athens greece cairo egypt helsinki", group: "abbreviation" },
  { id: "eest", label: "Eastern European Summer Time (EEST)", abbreviation: "EEST", timezone: "Europe/Athens", keywords: "athens greece cairo egypt helsinki summer", group: "abbreviation" },
  { id: "jst", label: "Japan Standard Time (JST)", abbreviation: "JST", timezone: "Asia/Tokyo", keywords: "tokyo japan osaka", group: "abbreviation" },
  { id: "kst", label: "Korea Standard Time (KST)", abbreviation: "KST", timezone: "Asia/Seoul", keywords: "seoul korea south korea", group: "abbreviation" },
  { id: "sgt", label: "Singapore Time (SGT)", abbreviation: "SGT", timezone: "Asia/Singapore", keywords: "singapore", group: "abbreviation" },
  { id: "aest", label: "Australian Eastern Standard Time (AEST)", abbreviation: "AEST", timezone: "Australia/Sydney", keywords: "sydney australia melbourne brisbane canberra", group: "abbreviation" },
  { id: "aedt", label: "Australian Eastern Daylight Time (AEDT)", abbreviation: "AEDT", timezone: "Australia/Sydney", keywords: "sydney australia melbourne canberra summer daylight", group: "abbreviation" },
  { id: "nzst", label: "New Zealand Standard Time (NZST)", abbreviation: "NZST", timezone: "Pacific/Auckland", keywords: "auckland new zealand wellington", group: "abbreviation" },
  { id: "nzdt", label: "New Zealand Daylight Time (NZDT)", abbreviation: "NZDT", timezone: "Pacific/Auckland", keywords: "auckland new zealand wellington summer daylight", group: "abbreviation" },
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

export const QUICK_PRESETS: { from: string; to: string }[] = [
  { from: "gmt", to: "ist" },
  { from: "gmt", to: "est" },
  { from: "gmt", to: "cst" },
  { from: "gmt", to: "pst" },
  { from: "gmt", to: "mst" },
  { from: "gmt", to: "utc" },
  { from: "ist", to: "est" },
  { from: "ist", to: "edt" },
  { from: "ist", to: "cst" },
  { from: "ist", to: "cdt" },
  { from: "ist", to: "pst" },
  { from: "ist", to: "pdt" },
  { from: "ist", to: "mst" },
  { from: "ist", to: "mdt" },
  { from: "ist", to: "ast" },
  { from: "ist", to: "gmt" },
  { from: "ist", to: "utc" },
  { from: "est", to: "ist" },
  { from: "est", to: "pst" },
  { from: "est", to: "cst" },
  { from: "est", to: "mst" },
  { from: "pst", to: "ist" },
  { from: "cst", to: "ist" },
  { from: "utc", to: "ist" },
];
