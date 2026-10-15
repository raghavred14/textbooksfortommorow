# Textbooks for Tomorrow — Website

Static website for **Textbooks for Tomorrow**, a student-run 501(c)(3) nonprofit in Frisco, Texas that donates books to underprivileged students.

The layout follows [avbotz.com](https://www.avbotz.com): a fixed see-through header, a full-screen hero with a crossfading photo slideshow under a blue gradient, animated waves, photo cards, a video with a play button, a tinted stats band, framed photo carousels, a full-bleed closing section, and a dark footer.

## Pages

| File | Page |
|------|------|
| `index.html` | Home |
| `mission.html` | Our Mission |
| `team.html` | Our Team |
| `outreach.html` | Outreach (reels, Richwoods drive, tournaments, events) |
| `donate.html` | Donate |
| `contact.html` | Contact |

The header and footer for every page come from `js/main.js`, so nav links, the footer, and shared URLs (GoFundMe, book list, Instagram, drive sign-up, email) are edited in one place.

## Photos and videos

All photos and videos are from the [@textbooksfortomorrow.npo](https://www.instagram.com/textbooksfortomorrow.npo/) Instagram:

- `media/video/` holds three reels (Aug 27, Sep 6 and Sep 17, 2025) and their poster images.
- `media/img/` holds photos cut out of the Richwoods Recap and Basketball Recap posts, plus stills from the reels.

To swap a photo, drop a new file into `media/img/` and update the `src` in the page. Slideshows are just a list of `<img>` tags inside `.slides` (backgrounds) or `.fader` (framed carousels).

## Scroll effects

- Hero and closing backgrounds crossfade between photos with a slow zoom
- Three layers of animated waves at the edge of each photo section
- Sections fade and slide in as you scroll
- Stat numbers count up when they come into view
- Header turns more solid after you scroll
- Everything turns off for visitors who've set "reduce motion"

## Editing

- **Stats:** change the `data-count` values in `index.html`. Right now they're from the fall 2025 Richwoods drive (1,836 books, 1,600 houses, 120+ volunteers) and the 4 charity tournaments.
- **Officers:** edit the `.member` blocks in `team.html`. To use a photo, replace the initials in `.avatar` with `<img src="media/img/name.jpg" alt="Name">`.
- **Events:** edit the list in `outreach.html`.
- After changing `css/style.css` or `js/main.js`, bump the `?v=` number on their links in each page so browsers load the new version.

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Publish with GitHub Pages

Repo → **Settings → Pages** → Source: *Deploy from a branch* → `main` / `(root)` → Save.
