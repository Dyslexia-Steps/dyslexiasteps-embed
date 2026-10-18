/**
 * <dyslexiasteps-game game="listen" list="short-a" lang="en" size="standard"></dyslexiasteps-game>
 *
 * Builds an iframe to https://dyslexiasteps.com/embed/<lang>/<game>/<list>, keeps its height equal to its
 * content and writes the visible credit link into the HOST page (light DOM). A link inside the iframe
 * belongs to the game's own document, not to your page, so the credit line is written into yours; the
 * terms (https://dyslexiasteps.com/embed) ask for it to stay visible.
 *
 * The game page loads no analytics and sets no cookies.
 */
const ORIGIN = "https://dyslexiasteps.com";
const SIZES = { compact: [360, 520], standard: [480, 560], wide: [720, 520] };
const GAMES = ["listen", "build", "choice", "dictation"];
const LANGS = ["en", "de", "es", "fr", "nl", "pt-br"];
const CREDIT = {
  en: "Free reading games by", de: "Kostenlose Leselernspiele von", es: "Juegos de lectura gratis de",
  fr: "Jeux de lecture gratuits de", nl: "Gratis leesspelletjes van", "pt-br": "Jogos de leitura grátis de",
};

export class DyslexiaStepsGame extends HTMLElement {
  connectedCallback() {
    if (this._mounted) return;
    const game = this.getAttribute("game");
    const list = this.getAttribute("list") || "";
    const lang = (this.getAttribute("lang") || "en").toLowerCase();
    if (!GAMES.includes(game) || !/^[a-z0-9-]+$/.test(list) || !LANGS.includes(lang)) return;
    this._mounted = true;
    const [w, h] = SIZES[this.getAttribute("size")] || SIZES.standard;

    const frame = document.createElement("iframe");
    frame.src = `${ORIGIN}/embed/${lang}/${game}/${list}`;
    frame.title = "Reading game by Dyslexia Steps";
    frame.loading = "lazy";
    frame.width = String(w);
    frame.height = String(h);
    frame.style.cssText = `border:0;width:100%;max-width:${w}px;height:${h}px;display:block;margin:0 auto`;

    const credit = document.createElement("p");
    credit.style.cssText = "text-align:center;font:12px/1.4 system-ui,sans-serif;margin:6px 0 0";
    const a = document.createElement("a");
    a.href = ORIGIN + (lang === "en" ? "/" : `/${lang}`);
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = "Dyslexia Steps";
    credit.append(`${CREDIT[lang]} `, a);

    this.append(frame, credit);
    this._onMessage = (e) => {
      if (e.origin !== ORIGIN || e.source !== frame.contentWindow) return;
      const m = e.data;
      if (!m || m.source !== "dys-embed" || m.type !== "resize") return;
      const height = Number(m.height);
      if (Number.isFinite(height) && height >= 120 && height <= 2000) frame.style.height = `${Math.ceil(height)}px`;
    };
    window.addEventListener("message", this._onMessage);
  }
  disconnectedCallback() {
    window.removeEventListener("message", this._onMessage);
    this._mounted = false;
  }
}

if (typeof customElements !== "undefined" && !customElements.get("dyslexiasteps-game")) {
  customElements.define("dyslexiasteps-game", DyslexiaStepsGame);
}
