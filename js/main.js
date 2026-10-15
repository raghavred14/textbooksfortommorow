// Textbooks for Tomorrow — shared header/footer, slideshows, waves, scroll effects
(function () {
  const LINKS = {
    donate: "https://www.gofundme.com/f/raise-books-for-kids-in-dallasfort-worth",
    bookList: "https://docs.google.com/spreadsheets/d/169Zz8SJV0CBqNpOT0__UXH233UBkPdcWoALO-atfQT4/edit?usp=sharing",
    instagram: "https://www.instagram.com/textbooksfortomorrow.npo/",
    signup: "http://bit.ly/t4tdrive",
    email: "textbookstomorrow@gmail.com",
  };

  const page = document.body.dataset.page || "home";
  const NAV = [
    ["home", "index.html", "Home"],
    ["mission", "mission.html", "Our Mission"],
    ["team", "team.html", "Our Team"],
    ["outreach", "outreach.html", "Outreach"],
    ["donate", "donate.html", "Donate"],
    ["contact", "contact.html", "Contact"],
  ];

  // Open-book logo mark (white on transparent)
  const LOGO = `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><circle cx="24" cy="24" r="23" fill="#fff"/><path d="M10 16c4.5-1.6 9-1.2 13 1.4v17c-4-2.6-8.5-3-13-1.4v-17Z" fill="#4353e6"/><path d="M38 16c-4.5-1.6-9-1.2-13 1.4v17c4-2.6 8.5-3 13-1.4v-17Z" fill="#6e7cff"/><path d="M13 21h7M13 25h7M28 21h7M28 25h7" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/><path d="M33 9l4 4-8 8-5 1 1-5 8-8Z" fill="#1b2a6b"/></svg>`;
  const ICONS = {
    instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>`,
    mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
    phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>`,
    play: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4v16l13-8z"/></svg>`,
  };

  // ----- Header -----
  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <div class="container nav">
      <a class="logo" href="index.html" aria-label="Textbooks for Tomorrow home">${LOGO}<span>Textbooks for Tomorrow</span></a>
      <button class="nav-toggle" aria-label="Open menu" aria-expanded="false">☰</button>
      <ul class="nav-links">
        ${NAV.map(([id, href, label]) => `<li><a href="${href}" class="${id === page ? "active" : ""}">${label}</a></li>`).join("")}
        <li><a class="cta-link" href="${LINKS.donate}" target="_blank" rel="noopener">Give Now</a></li>
      </ul>
    </div>`;
  document.body.prepend(header);
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
    <div class="container top">
      <div>
        <a class="logo" href="index.html">${LOGO}<span>Textbooks for Tomorrow</span></a>
        <small>© ${new Date().getFullYear()} Textbooks for Tomorrow, a 501(c)(3) nonprofit · Frisco, Texas</small>
        <small>Donating books to the underprivileged. 100% free for students.</small>
      </div>
      <div>
        <h4>Overview</h4>
        <ul>
          <li><a href="mission.html">Our Mission</a></li>
          <li><a href="team.html">Our Team</a></li>
          <li><a href="outreach.html">Outreach</a></li>
        </ul>
      </div>
      <div>
        <h4>Get Involved</h4>
        <ul>
          <li><a href="donate.html">Donate Books</a></li>
          <li><a href="${LINKS.donate}" target="_blank" rel="noopener">Donate Money</a></li>
          <li><a href="${LINKS.bookList}" target="_blank" rel="noopener">Book List</a></li>
        </ul>
      </div>
      <div>
        <h4>Connect</h4>
        <ul>
          <li><a href="mailto:${LINKS.email}">${LINKS.email}</a></li>
          <li><a href="tel:+14693053690">+1 (469) 305-3690</a></li>
        </ul>
        <div class="socials">
          <a href="${LINKS.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICONS.instagram}</a>
          <a href="mailto:${LINKS.email}" aria-label="Email">${ICONS.mail}</a>
          <a href="tel:+14693053690" aria-label="Phone">${ICONS.phone}</a>
        </div>
      </div>
    </div>`;
  document.body.append(footer);

  // Shared links: <a data-link="donate">
  document.querySelectorAll("[data-link]").forEach((a) => {
    const url = LINKS[a.dataset.link];
    if (!url) return;
    a.href = a.dataset.link === "email" ? `mailto:${url}` : url;
    if (url.startsWith("http")) { a.target = "_blank"; a.rel = "noopener"; }
  });

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ----- Animated waves: <div class="waves bottom"></div> -----
  function wavePath(amp, len, phase) {
    // one tile of a smooth wave, 1200 wide x 100 tall, filled to the bottom
    let d = `M0 ${50 + amp * Math.sin(phase)}`;
    for (let x = 0; x <= 1200; x += 20) {
      const y = 50 + amp * Math.sin((x / len) * Math.PI * 2 + phase);
      d += ` L${x} ${y.toFixed(1)}`;
    }
    return d + " L1200 100 L0 100 Z";
  }
  const layers = [
    ["w1", 22, 600, 0],
    ["w2", 16, 400, 1.3],
    ["w3", 10, 300, 2.1],
  ];
  document.querySelectorAll(".waves").forEach((el) => {
    el.innerHTML = layers.map(([cls, amp, len, ph]) => {
      const p = wavePath(amp, len, ph);
      return `<svg class="${cls}" viewBox="0 0 2400 100" preserveAspectRatio="none" aria-hidden="true"><path fill="currentColor" d="${p}"/><path fill="currentColor" transform="translate(1200 0)" d="${p}"/></svg>`;
    }).join("");
  });

  // ----- Crossfading slideshows: .slides (hero/closing backgrounds) and .fader (framed carousels) -----
  function slideshow(container, interval) {
    const imgs = [...container.querySelectorAll("img")];
    if (!imgs.length) return;
    let i = 0;
    imgs[0].classList.add("on");
    let dots = [];
    if (container.classList.contains("fader") && imgs.length > 1) {
      const nav = document.createElement("div");
      nav.className = "dots";
      dots = imgs.map((_, k) => {
        const b = document.createElement("button");
        b.setAttribute("aria-label", `Show photo ${k + 1}`);
        b.addEventListener("click", () => { show(k); restart(); });
        nav.append(b);
        return b;
      });
      container.append(nav);
      dots[0].classList.add("on");
    }
    function show(k) {
      imgs[i].classList.remove("on"); dots[i] && dots[i].classList.remove("on");
      i = k;
      imgs[i].classList.add("on"); dots[i] && dots[i].classList.add("on");
    }
    let timer;
    const restart = () => { clearInterval(timer); if (!reduce && imgs.length > 1) timer = setInterval(() => show((i + 1) % imgs.length), interval); };
    restart();
  }
  document.querySelectorAll(".slides").forEach((s) => slideshow(s, 6000));
  document.querySelectorAll(".fader").forEach((s) => slideshow(s, 4500));

  // ----- Videos with a big play button: .media-frame > video + .play -----
  document.querySelectorAll(".media-frame video").forEach((video) => {
    const frame = video.parentElement;
    const btn = document.createElement("button");
    btn.className = "play";
    btn.setAttribute("aria-label", "Play video");
    btn.innerHTML = ICONS.play;
    frame.append(btn);
    btn.addEventListener("click", () => {
      document.querySelectorAll(".media-frame video").forEach((v) => { if (v !== video) v.pause(); });
      video.controls = true;
      video.play();
      frame.classList.add("playing");
    });
    video.addEventListener("ended", () => frame.classList.remove("playing"));
  });

  // ----- Header background on scroll -----
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ----- Reveal on scroll -----
  document.querySelectorAll(".stagger").forEach((group) => {
    [...group.children].forEach((child, i) => {
      child.style.setProperty("--i", i);
      child.classList.add("reveal");
    });
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // ----- Count-up numbers: <span data-count="1836" data-suffix="+"> -----
  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const pre = el.dataset.prefix || "", suf = el.dataset.suffix || "";
    if (reduce) { el.textContent = pre + target.toLocaleString() + suf; return; }
    const start = performance.now(), dur = 1800;
    (function step(now) {
      const t = Math.min((now - start) / dur, 1);
      el.textContent = pre + Math.round(target * (1 - Math.pow(1 - t, 3))).toLocaleString() + suf;
      if (t < 1) requestAnimationFrame(step);
    })(start);
  }
  const cio = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); } });
  }, { threshold: 0.5 });
  document.querySelectorAll("[data-count]").forEach((el) => cio.observe(el));

  // ----- Forms open an email to the team (static site, no backend) -----
  document.querySelectorAll("form[data-mailto]").forEach((form) => {
    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const body = [...new FormData(form).entries()].map(([k, v]) => `${k}: ${v}`).join("\n");
      location.href = `mailto:${LINKS.email}?subject=${encodeURIComponent(form.dataset.mailto)}&body=${encodeURIComponent(body)}`;
    });
  });
})();
