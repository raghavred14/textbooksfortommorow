// Textbooks for Tomorrow — shared header/footer + scroll effects
(function () {
  const LINKS = {
    donate: "https://www.gofundme.com/f/raise-books-for-kids-in-dallasfort-worth",
    bookList: "https://docs.google.com/spreadsheets/d/169Zz8SJV0CBqNpOT0__UXH233UBkPdcWoALO-atfQT4/edit?usp=sharing",
    instagram: "https://www.instagram.com/textbooksfortomorrow.npo/",
    email: "textbookstomorrow@gmail.com",
  };

  const page = document.body.dataset.page || "home";
  const nav = [
    ["home", "index.html", "Home"],
    ["mission", "mission.html", "Our Mission"],
    ["team", "team.html", "Our Team"],
    ["donate", "donate.html", "Donate Books"],
    ["contact", "contact.html", "Contact"],
  ];

  // ----- Header -----
  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <div class="container nav">
      <a class="brand" href="index.html" aria-label="Textbooks for Tomorrow home">
        <span class="brand-mark">📚</span>
        <span>Textbooks for Tomorrow<small>501(c)(3) Nonprofit</small></span>
      </a>
      <button class="nav-toggle" aria-label="Open menu" aria-expanded="false">☰</button>
      <ul class="nav-links">
        ${nav.map(([id, href, label]) => `<li><a href="${href}" class="${id === page ? "active" : ""}">${label}</a></li>`).join("")}
        <li><a class="btn-nav" href="${LINKS.donate}" target="_blank" rel="noopener">Give Now</a></li>
      </ul>
    </div>`;
  document.body.prepend(header);

  const bar = document.createElement("div");
  bar.className = "progress";
  document.body.prepend(bar);

  const toggle = header.querySelector(".nav-toggle");
  const links = header.querySelector(".nav-links");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
    toggle.textContent = open ? "✕" : "☰";
  });

  // ----- Footer -----
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <a class="brand" href="index.html" style="color:#fff"><span class="brand-mark">📚</span><span>Textbooks for Tomorrow</span></a>
          <p style="margin-top:14px;max-width:360px">A 501(c)(3) nonprofit helping underprivileged students reach their full potential by reusing textbooks, offering free curriculum, and kids tutoring kids.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>${nav.map(([, href, label]) => `<li><a href="${href}">${label}</a></li>`).join("")}</ul>
        </div>
        <div>
          <h4>Get in touch</h4>
          <ul>
            <li>Frisco, Texas, USA</li>
            <li><a href="tel:+14693053690">+1 (469) 305-3690</a></li>
            <li><a href="mailto:${LINKS.email}">${LINKS.email}</a></li>
            <li><a href="${LINKS.instagram}" target="_blank" rel="noopener">Instagram @textbooksfortomorrow.npo</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} Textbooks for Tomorrow. All rights reserved.</span>
        <span>Made by students, for students.</span>
      </div>
    </div>`;
  document.body.append(footer);

  // Fill any [data-link] anchors with the shared URLs
  document.querySelectorAll("[data-link]").forEach((a) => {
    const url = LINKS[a.dataset.link];
    if (!url) return;
    a.href = a.dataset.link === "email" ? `mailto:${url}` : url;
    if (url.startsWith("http")) { a.target = "_blank"; a.rel = "noopener"; }
  });

  // ----- Scroll: header state, progress bar, hero parallax -----
  const heroBg = document.querySelector(".hero-bg");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 30);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    if (heroBg && !reduce) heroBg.style.transform = `translateY(${y * 0.35}px)`;
    ticking = false;
  }
  window.addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  // ----- Reveal on scroll -----
  document.querySelectorAll(".stagger").forEach((group) => {
    [...group.children].forEach((child, i) => {
      child.style.setProperty("--i", i);
      if (!child.classList.contains("reveal")) child.classList.add("reveal");
    });
  });
  document.querySelectorAll(".art .spine").forEach((s, i, all) => {
    const siblings = [...s.parentElement.children];
    s.style.setProperty("--i", siblings.indexOf(s));
  });

  const revealIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); revealIO.unobserve(e.target); }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal, .art").forEach((el) => revealIO.observe(el));

  // ----- Counting stats -----
  function animateCount(el) {
    const target = parseFloat(el.dataset.count);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    if (reduce) { el.textContent = prefix + target.toLocaleString() + suffix; return; }
    const dur = 1800;
    const start = performance.now();
    function step(now) {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = prefix + Math.round(target * eased).toLocaleString() + suffix;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { animateCount(e.target); countIO.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll("[data-count]").forEach((el) => countIO.observe(el));

  // ----- Floating books in hero -----
  if (heroBg) {
    const books = [
      [8, 18, 46, 64, -12], [82, 22, 40, 58, 10], [15, 70, 36, 52, 8],
      [74, 68, 50, 70, -8], [45, 12, 30, 42, 14], [58, 82, 34, 48, -14],
      [30, 40, 26, 36, 20], [90, 48, 28, 40, -18],
    ];
    books.forEach(([x, y, w, h, r], i) => {
      const b = document.createElement("span");
      b.className = "book";
      b.style.cssText = `left:${x}%;top:${y}%;width:${w}px;height:${h}px;--r:${r}deg;animation-delay:${-i * 1.3}s`;
      heroBg.append(b);
    });
  }

  // ----- Newsletter form -> opens email to the team (static site, no backend) -----
  document.querySelectorAll("form[data-mailto]").forEach((form) => {
    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const data = new FormData(form);
      const subject = encodeURIComponent(form.dataset.mailto);
      const body = encodeURIComponent([...data.entries()].map(([k, v]) => `${k}: ${v}`).join("\n"));
      window.location.href = `mailto:${LINKS.email}?subject=${subject}&body=${body}`;
    });
  });
})();
