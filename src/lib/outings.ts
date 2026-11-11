import { getCollection, type CollectionEntry } from "astro:content";

export type Outing = CollectionEntry<"outings">;
export type OutingType = Outing["data"]["type"];

export const TYPES: { id: OutingType; one: string; many: string }[] = [
  { id: "hike", one: "hike", many: "hikes" },
  { id: "swim", one: "swim", many: "swims" },
  { id: "camp", one: "camp", many: "camps" },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2019" -> "2019-00-00", "2021-03" -> "2021-03-00" so year-only and month-only entries sort sensibly. */
export const sortKey = (d: string) => d.padEnd(10, "-00");

export const yearOf = (d: string) => d.slice(0, 4);

/** "2026-11-08" -> "8 Nov 2026", "2021-03" -> "Mar 2021", "2019" -> "2019" */
export function formatDate(d: string): string {
  const [y, m, day] = d.split("-");
  if (!m) return y;
  const month = MONTHS[Number(m) - 1];
  return day ? `${Number(day)} ${month} ${y}` : `${month} ${y}`;
}

/** Published entries, newest first. Drafts are visible in `npm run dev` only. */
export async function getOutings(): Promise<Outing[]> {
  const all = await getCollection("outings", ({ data }) => import.meta.env.DEV || !data.draft);
  return all.sort((a, b) => sortKey(b.data.date).localeCompare(sortKey(a.data.date)));
}

export function summary(entries: Outing[]): string {
  return TYPES.map((t) => ({ t, n: entries.filter((e) => e.data.type === t.id).length }))
    .filter(({ n }) => n > 0)
    .map(({ t, n }) => `${n} ${n === 1 ? t.one : t.many}`)
    .join(" · ");
}
