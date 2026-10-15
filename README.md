# Textbooks for Tomorrow — Website

Static website for **Textbooks for Tomorrow**, a student-run 501(c)(3) nonprofit in Frisco, Texas that donates books to underprivileged students.

The layout follows [avbotz.com](https://www.avbotz.com): a fixed see-through header, a full-screen hero photo under a blue gradient, a line of books that drops in and moves along each section edge, photo cards, a video with a play button, a tinted stats band, framed photo carousels, a full-bleed closing section, and a dark footer.

## Pages

| File | Page |
|------|------|
| `index.html` | Home |
| `mission.html` | Our Mission |
| `team.html` | Our Team |
| `outreach.html` | Outreach (reels, Richwoods drive, tournaments, events) |
| `donate.html` | Give Now (opened from the Give Now button) |
| `contact.html` | Contact |

The header and footer for every page come from `js/main.js`, so nav links, the footer, and shared URLs (GoFundMe, book list, Instagram, drive sign-up, email) are edited in one place.

## Photos and videos

All photos and videos are from the [@textbooksfortomorrow.npo](https://www.instagram.com/textbooksfortomorrow.npo/) Instagram:

- `media/video/` holds three reels (Aug 27, Sep 6 and Sep 17, 2025) and their poster images.
- `media/img/` holds photos cut out of the Richwoods Recap and Basketball Recap posts, plus stills from the reels.

To swap a photo, drop a new file into `media/img/` and update the `src` in the page. Slideshows are just a list of `<img>` tags inside `.slides` (backgrounds) or `.fader` (framed carousels).

## Scroll effects

- Hero and closing backgrounds crossfade between photos with a slow zoom
- Books drop in and then move along in a line at the edge of each photo section (built in `js/main.js`, no image files needed)
- "Where our alumni go" logo strip scrolls in a loop (same pattern as reviveinvestments.org); logos are in `media/logos/` from Wikimedia Commons
- Sections fade and slide in as you scroll
- Stat numbers count up when they come into view
- Header turns more solid after you scroll
- Everything turns off for visitors who've set "reduce motion"

## Editing

- **Stats:** change the `data-count` values in `index.html` ("At a Glance").
- **Alumni schools:** edit the `ALUMNI` list in `js/main.js` and add the logo to `media/logos/`.
- **Officers:** photos live in `media/team/` (square). Irene's card shows an initial until you add `media/team/irene.jpg` and swap it in (see the comment in `team.html`).
- **Events:** edit the list in `outreach.html`.
- After changing `css/style.css` or `js/main.js`, bump the `?v=` number on their links in each page so browsers load the new version.

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Publish with GitHub Pages

Repo → **Settings → Pages** → Source: *Deploy from a branch* → `main` / `(root)` → Save.
