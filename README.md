# Textbooks for Tomorrow — Website

Static website for **Textbooks for Tomorrow**, a 501(c)(3) nonprofit in Frisco, Texas that helps underprivileged students by reusing textbooks, offering free curriculum, and kids tutoring kids.

Layout inspired by [avbotz.com](https://www.avbotz.com): fixed see-through header, full-screen hero, cards that overlap the hero, alternating text/image sections, an animated stats band, and a team grid.

## Pages

| File | Page |
|------|------|
| `index.html` | Home |
| `mission.html` | Our Mission |
| `team.html` | Our Team |
| `donate.html` | Donate Books |
| `contact.html` | Contact |

The header and footer for every page are generated in `js/main.js`, so you edit nav links, the footer, and shared URLs (GoFundMe, book list, Instagram, email) in one place.

## Scroll effects

- Sections fade and slide in as you scroll (`.reveal`, `.from-left`, `.from-right`, `.zoom`, `.stagger`)
- Stat numbers count up when they come into view
- Hero background moves slower than the page (parallax) and has floating books
- Header turns solid and shrinks after you scroll
- Gold progress bar across the top
- Book-spine illustrations "grow" onto the shelf
- Everything turns off for visitors who've set "reduce motion"

## Editing

- **Stats:** change the `data-count` values in `index.html` and `team.html` (look for `EDIT STATS HERE`).
- **Team members:** edit the `.member` blocks in `team.html`. To use a photo, replace the initials in `.avatar` with `<img src="images/name.jpg" alt="Name">`.

## Run locally

Open `index.html` in a browser, or run:

```bash
python3 -m http.server 8000
```

## Publish with GitHub Pages

Repo → **Settings → Pages** → Source: *Deploy from a branch* → `main` / `(root)` → Save.
