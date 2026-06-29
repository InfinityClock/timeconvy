export interface TimezoneOption {
  id: string;
  label: string; // shown in dropdown, e.g. "India Standard Time (IST)"
  abbreviation: string;
  timezone: string; // IANA id
  keywords: string; // extra search terms (city names, country)
}

export const TIMEZONE_OPTIONS: TimezoneOption[] = [
  { id: "ist", label: "India Standard Time (IST)", abbreviation: "IST", timezone: "Asia/Kolkata", keywords: "india mumbai delhi bangalore chennai new delhi bengaluru" },
  { id: "est", label: "Eastern Standard Time (EST)", abbreviation: "EST", timezone: "America/New_York", keywords: "new york eastern us usa east coast washington boston" },
  { id: "edt", label: "Eastern Daylight Time (EDT)", abbreviation: "EDT", timezone: "America/New_York", keywords: "new york eastern daylight us usa" },
  { id: "cst", label: "Central Standard Time (CST)", abbreviation: "CST", timezone: "America/Chicago", keywords: "chicago central us usa houston dallas" },
  { id: "cdt", label: "Central Daylight Time (CDT)", abbreviation: "CDT", timezone: "America/Chicago", keywords: "chicago central daylight us usa" },
  { id: "pst", label: "Pacific Standard Time (PST)", abbreviation: "PST", timezone: "America/Los_Angeles", keywords: "los angeles pacific us usa san francisco seattle california" },
  { id: "pdt", label: "Pacific Daylight Time (PDT)", abbreviation: "PDT", timezone: "America/Los_Angeles", keywords: "los angeles pacific daylight us usa california" },
  { id: "mst", label: "Mountain Standard Time (MST)", abbreviation: "MST", timezone: "America/Denver", keywords: "denver mountain us usa phoenix arizona" },
  { id: "mdt", label: "Mountain Daylight Time (MDT)", abbreviation: "MDT", timezone: "America/Denver", keywords: "denver mountain daylight us usa" },
  { id: "ast", label: "Atlantic Standard Time (AST)", abbreviation: "AST", timezone: "America/Halifax", keywords: "halifax atlantic canada puerto rico" },
  { id: "gmt", label: "Greenwich Mean Time (GMT)", abbreviation: "GMT", timezone: "Europe/London", keywords: "london uk united kingdom england" },
  { id: "bst", label: "British Summer Time (BST)", abbreviation: "BST", timezone: "Europe/London", keywords: "london uk united kingdom england summer" },
  { id: "utc", label: "Coordinated Universal Time (UTC)", abbreviation: "UTC", timezone: "UTC", keywords: "universal coordinated zulu" },
  { id: "cet", label: "Central European Time (CET)", abbreviation: "CET", timezone: "Europe/Paris", keywords: "paris france berlin germany madrid spain rome italy amsterdam europe" },
  { id: "eet", label: "Eastern European Time (EET)", abbreviation: "EET", timezone: "Europe/Athens", keywords: "athens greece cairo egypt helsinki" },
  { id: "jst", label: "Japan Standard Time (JST)", abbreviation: "JST", timezone: "Asia/Tokyo", keywords: "tokyo japan osaka" },
  { id: "kst", label: "Korea Standard Time (KST)", abbreviation: "KST", timezone: "Asia/Seoul", keywords: "seoul korea south korea" },
  { id: "sgt", label: "Singapore Time (SGT)", abbreviation: "SGT", timezone: "Asia/Singapore", keywords: "singapore" },
  { id: "aest", label: "Australian Eastern Time (AEST)", abbreviation: "AEST", timezone: "Australia/Sydney", keywords: "sydney australia melbourne brisbane canberra" },
  { id: "nzst", label: "New Zealand Time (NZST)", abbreviation: "NZST", timezone: "Pacific/Auckland", keywords: "auckland new zealand wellington" },
  { id: "dubai", label: "Dubai (GST)", abbreviation: "GST", timezone: "Asia/Dubai", keywords: "dubai uae united arab emirates abu dhabi" },
  { id: "hkt", label: "Hong Kong Time (HKT)", abbreviation: "HKT", timezone: "Asia/Hong_Kong", keywords: "hong kong" },
  { id: "ict", label: "Indochina Time (ICT)", abbreviation: "ICT", timezone: "Asia/Bangkok", keywords: "bangkok thailand vietnam" },
  { id: "wib", label: "Western Indonesia Time (WIB)", abbreviation: "WIB", timezone: "Asia/Jakarta", keywords: "jakarta indonesia" },
  { id: "pkt", label: "Pakistan Standard Time (PKT)", abbreviation: "PKT", timezone: "Asia/Karachi", keywords: "karachi pakistan islamabad" },
  { id: "bdt", label: "Bangladesh Time (BST)", abbreviation: "BDT", timezone: "Asia/Dhaka", keywords: "dhaka bangladesh" },
  { id: "msk", label: "Moscow Time (MSK)", abbreviation: "MSK", timezone: "Europe/Moscow", keywords: "moscow russia" },
  { id: "sast", label: "South Africa Time (SAST)", abbreviation: "SAST", timezone: "Africa/Johannesburg", keywords: "johannesburg cape town south africa" },
  { id: "brt", label: "Brasília Time (BRT)", abbreviation: "BRT", timezone: "America/Sao_Paulo", keywords: "sao paulo brazil rio de janeiro brasilia" },
  { id: "art", label: "Argentina Time (ART)", abbreviation: "ART", timezone: "America/Argentina/Buenos_Aires", keywords: "buenos aires argentina" },
  { id: "london", label: "London", abbreviation: "GMT/BST", timezone: "Europe/London", keywords: "uk england united kingdom" },
  { id: "paris", label: "Paris", abbreviation: "CET/CEST", timezone: "Europe/Paris", keywords: "france" },
  { id: "berlin", label: "Berlin", abbreviation: "CET/CEST", timezone: "Europe/Berlin", keywords: "germany" },
  { id: "sydney", label: "Sydney", abbreviation: "AEST/AEDT", timezone: "Australia/Sydney", keywords: "australia" },
  { id: "tokyo", label: "Tokyo", abbreviation: "JST", timezone: "Asia/Tokyo", keywords: "japan" },
  { id: "singapore", label: "Singapore", abbreviation: "SGT", timezone: "Asia/Singapore", keywords: "" },
  { id: "toronto", label: "Toronto", abbreviation: "EST/EDT", timezone: "America/Toronto", keywords: "canada" },
  { id: "mexico-city", label: "Mexico City", abbreviation: "CST/CDT", timezone: "America/Mexico_City", keywords: "mexico" },
  { id: "los-angeles", label: "Los Angeles", abbreviation: "PST/PDT", timezone: "America/Los_Angeles", keywords: "california us usa" },
  { id: "chicago", label: "Chicago", abbreviation: "CST/CDT", timezone: "America/Chicago", keywords: "us usa illinois" },
  { id: "new-york", label: "New York", abbreviation: "EST/EDT", timezone: "America/New_York", keywords: "us usa" },
  { id: "mumbai", label: "Mumbai", abbreviation: "IST", timezone: "Asia/Kolkata", keywords: "india" },
  { id: "san-francisco", label: "San Francisco", abbreviation: "PST/PDT", timezone: "America/Los_Angeles", keywords: "california us usa" },
  { id: "seoul", label: "Seoul", abbreviation: "KST", timezone: "Asia/Seoul", keywords: "south korea" },
  { id: "shanghai", label: "Shanghai", abbreviation: "CST", timezone: "Asia/Shanghai", keywords: "china beijing" },
  { id: "lagos", label: "Lagos", abbreviation: "WAT", timezone: "Africa/Lagos", keywords: "nigeria" },
  { id: "cairo", label: "Cairo", abbreviation: "EET", timezone: "Africa/Cairo", keywords: "egypt" },
  { id: "nairobi", label: "Nairobi", abbreviation: "EAT", timezone: "Africa/Nairobi", keywords: "kenya" },
];

export const TIMEZONE_BY_ID: Record<string, TimezoneOption> = TIMEZONE_OPTIONS.reduce(
  (acc, tz) => {
    acc[tz.id] = tz;
    return acc;
  },
  {} as Record<string, TimezoneOption>
);

export const QUICK_PRESETS: { from: string; to: string }[] = [
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
  { from: "est", to: "pst" },
  { from: "est", to: "cst" },
  { from: "est", to: "mst" },
  { from: "gmt", to: "ist" },
  { from: "utc", to: "ist" },
];
