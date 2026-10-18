# dyslexiasteps-embed

**Free reading games for your own website.** Add a listen-and-find, build-the-word, choose-the-word or dictation game to a school,
tutoring or parenting site in a few lines, in English, German, Spanish, French, Dutch or Brazilian Portuguese. The games play audio,
need no sign-up, and the embedded game loads no analytics and sets no cookies.

![A reading game running inside a sample web page, with the credit link under it](https://dyslexiasteps.com/images/embed/embed-preview.png)

*The grey bars are your own page. The dashed box is the real game. The line under it is the credit link, written into your page.*

**Pick a game and copy the code on the [code builder](https://dyslexiasteps.com/embed)**: you see the result on a sample page before you paste anything.

## Install

**1. A script tag** (no build step, works in any HTML page):

```html
<div data-dys-game="listen" data-list="short-a"></div>
<script async src="https://dyslexiasteps.com/embed.js"></script>
```

**2. A web component** (npm, any framework):

```bash
npm install dyslexiasteps-embed
```

```html
<script type="module">import "dyslexiasteps-embed";</script>
<dyslexiasteps-game game="listen" list="short-a" lang="en" size="standard"></dyslexiasteps-game>
```

**3. React** (Next.js, Vite, …; registers the component on the client only):

```jsx
import { Game } from "dyslexiasteps-embed/react";

<Game game="build" list="short-a" size="wide" />
<Game game="choice" lang="es" list="vaya-o-valla" />
```

Using Vue, Svelte or Angular? Import the package once on the client and use `<dyslexiasteps-game>` as a normal custom element.

## Options

| Option (script / component) | Values | Default |
|---|---|---|
| `data-dys-game` / `game` | `listen`, `build`, `choice`, `dictation` | required |
| `data-list` / `list` | the word list id, such as `short-a` (English) or `palabras-con-m` (Spanish). **All ids are in [CATALOG.md](CATALOG.md)**; every id is also the last part of the list page's address, e.g. `dyslexiasteps.com/cvc-words/short-a` | required |
| `data-lang` / `lang` | `en`, `de`, `es`, `fr`, `nl`, `pt-br` | `en` |
| `data-size` / `size` | `compact` (360 px), `standard` (480 px), `wide` (720 px) | `standard` |

## Which `list` do I use? (find the id)

1. Open **[CATALOG.md](CATALOG.md)**: every list id for every language, with the games that exist for it (listen, build, choice, dictation). Copy the id from the first column.
2. Or open the **[code builder](https://dyslexiasteps.com/embed)**, pick the game, language and list from the buttons, and copy the finished code.
3. Or read it from code: [`catalog.json`](catalog.json) (also at <https://docs.dyslexiasteps.com/embed-catalog.json>) lists `games → language → [{ list, title, page }]`.

Examples that exist today:

| What you want | Code |
|---|---|
| English short-a words, listen game | `data-dys-game="listen" data-list="short-a"` |
| German words with "sch", build game | `data-dys-game="build" data-lang="de" data-list="woerter-mit-sch"` |
| German dictation, grade 1 | `data-dys-game="dictation" data-lang="de" data-list="diktat-klasse-1"` |
| German "seid oder seit" sentence game | `data-dys-game="choice" data-lang="de" data-list="seid-oder-seit"` |

## Games and languages

| Game | What the child does | Languages |
|---|---|---|
| `listen` | Hears a word and taps the matching one out of four | all six |
| `build` | Hears a word and builds it from letter or syllable tiles | all six |
| `choice` | Fills a gap in a sentence with the right sound-alike word | de, es, fr, nl, pt-br |
| `dictation` | Listens, writes, and checks word by word | de, es, fr, nl, pt-br |

550 ready-to-embed games over 277 word lists. Not every list has every game, and the [code builder](https://dyslexiasteps.com/embed) only
offers combinations that exist. The full catalog is machine-readable: <https://docs.dyslexiasteps.com/embed-catalog.json>.

## The credit link

The script and the web component write one small line under the game into **your page**: "Free reading games by Dyslexia Steps",
linking to our home page. We ask that it stays visible; that is the whole price. A link inside the game's frame belongs to the game's
own document, not to your page, which is why the line is written into yours. With the plain `<iframe>` version you add it yourself
(the code builder shows both).

## Height

The game tells the page how tall it is and the iframe follows. If you use a plain iframe and want the same:

```js
window.addEventListener("message", (e) => {
  if (e.origin !== "https://dyslexiasteps.com") return;
  const m = e.data;
  if (m && m.source === "dys-embed" && m.type === "resize") iframe.style.height = Math.ceil(m.height) + "px";
});
```

## Privacy

The embedded game page loads **no analytics and sets no cookies**, and has no sign-up or account. Audio files load from
dyslexiasteps.com like any embedded file, so ordinary server request logs exist. The credit link on your page is only a link.

## Not a test

These are practice games with word lists. They do not score a child against a norm and do not assess anyone. They are separate from
the Dyslexia Steps screening test, which you cannot embed.

## If something does not work

- **The game does not show.** Some platforms remove `<script>` tags (for example free plans of some site builders). Use the plain
  `<iframe>` code from the code builder and add the credit line yourself.
- **Notion.** Notion takes an address only: paste the game URL, such as `https://dyslexiasteps.com/embed/en/listen/short-a`, after `/embed`.
- **Step-by-step for WordPress, Wix, Squarespace, Google Sites, Carrd and more** (taken from each platform's own help pages):
  <https://dyslexiasteps.com/embed#platforms>.
- **Still stuck?** Open an issue on [GitHub](https://github.com/Dyslexia-Steps/dyslexiasteps-embed/issues).

## Links

[Code builder](https://dyslexiasteps.com/embed) · [Docs](https://docs.dyslexiasteps.com/embed) · [Developer tools](https://dyslexiasteps.com/developers) ·
[Word lists by grade](https://dyslexiasteps.com/word-lists-by-grade) · [GitHub](https://github.com/Dyslexia-Steps)

Code MIT. The word lists are CC BY 4.0 (the Dolch words are public domain).
