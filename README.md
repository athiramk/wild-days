# Wild days

A personal journal of hikes, swims and camps: short notes, no photos. Built with [Astro](https://astro.build) and
published with GitHub Pages at **https://athiramk.com/wild-days/**.

It is **unlisted**: nothing links to it, every page asks search engines not to index it, and there is no analytics.
Anyone who has the address can still open it, so don't treat it as private (see "Keep it unlisted" below).

## Add an entry

Pick whichever is easiest at the time.

### On your laptop
```sh
npm run add-outing
```
It asks for the type, place, date and a one-line note, then creates the file. Then commit and push to `main`.

### On your phone
Use [Pages CMS](https://pagescms.org), a web editor for files in a GitHub repository (open source, free):
1. Go to https://app.pagescms.org and sign in with GitHub. It asks for write access to your repositories, so only
   allow it for this repository if you are given the choice.
2. Open this repository, choose **Outings**, tap **Add**, fill in type, place, date and the note, and save. Saving
   commits to `main`, which publishes the site within a couple of minutes.

The configuration is in `.pages.yml`. It has no photo fields on purpose. I could not test it on a phone while
building this, so after the first real use please check three things in the saved file under `src/content/outings/`:
- the `date` is saved as text in quotes (for example `date: "2026-11-08"`; the site also accepts it unquoted),
- the note ended up as the text below the `---` lines, and
- the file name looks right.
If any is off, tell me and I'll adjust `.pages.yml`.

### By hand
Create `src/content/outings/2026-11-08-wilsons-prom.md`:
```md
---
type: hike
place: "Wilsons Promontory"
date: "2026-11-08"
---
Long day to Sealers Cove and back. Wombats at dusk.
```
- `type` must be `hike`, `swim` or `camp`.
- `date` can be a full date, a month (`"2021-03"`) or just a year (`"2019"`), so old trips you only half remember are
  fine. Always put it in quotes.
- Add `draft: true` to keep an entry off the site while you finish it.
- A mistake in these fields fails the build with a message naming the file and the field.

Long notes show as an excerpt on the home page with a "Read more" link. Short notes show in full.

## Remembering old trips
Start with the ones you remember best and use approximate dates. A year is enough ("2019"). Your phone's photo
library is a good memory aid (search by place or scroll back by month), even though the photos themselves don't go on
this site.

## Preview on your computer
```sh
npm install
npm run dev        # http://localhost:4321/wild-days/
npm run build
npm run preview
```
(Drafts show in `npm run dev` but never on the live site.)

## Publish (first time)
1. On GitHub create an **empty** repository named exactly `wild-days`. The name matters: the site is served under
   `/wild-days/` and `astro.config.mjs` sets `base: "/wild-days"` to match. If you want another name, change `base`
   and the repository name together.
2. Push this folder (`git add -A`, `git commit`, `git remote add origin ...`, `git push -u origin main`).
3. In the repository go to **Settings → Pages** and set **Source** to **GitHub Actions**.
4. The custom domain comes from your main `athiramk.github.io` repository, so the journal appears at
   `https://athiramk.com/wild-days/` after the first successful run (check the **Actions** tab).

## Keep it unlisted
- The repository and the site are public, so anyone with the address (or who finds the repository) can read everything.
  Search engines are asked not to list it, but that is a request, not a lock.
- Don't link to it from your portfolio or anywhere public.
- Avoid putting in your home address, or posting about trips while you are still away. A note written when you are back
  is safer than one written live.
- A truly private journal would need a private repository, which on GitHub Pages requires a paid plan.
