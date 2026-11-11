import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// The date is kept as text: "2026-11-08", "2021-03" (month only) or "2019" (year only), so old trips
// with fuzzy dates are fine. YAML may turn an unquoted date/year into a Date or number, so accept those too.
const fuzzyDate = z
  .preprocess((v) => {
    if (v instanceof Date) return v.toISOString().slice(0, 10);
    if (typeof v === "number") return String(v);
    return v;
  }, z.string())
  .refine((s) => {
    const m = /^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/.exec(s);
    if (!m) return false;
    const month = m[2] ? Number(m[2]) : 1;
    const day = m[3] ? Number(m[3]) : 1;
    return month >= 1 && month <= 12 && day >= 1 && day <= 31;
  }, "date must look like 2026-11-08, 2021-03 or 2019");

const outings = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/outings" }),
  schema: z.object({
    type: z.enum(["hike", "swim", "camp"]),
    place: z.string().min(1),
    date: fuzzyDate,
    draft: z.boolean().optional(),
  }),
});

export const collections = { outings };
