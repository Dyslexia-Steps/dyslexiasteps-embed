import { createElement, useEffect } from "react";

/** React wrapper: <Game game="listen" list="short-a" lang="en" size="standard" />. Registers the web component on the client only. */
export function Game({ game, list, lang = "en", size = "standard" }) {
  useEffect(() => { import("./index.js"); }, []);
  return createElement("dyslexiasteps-game", { game, list, lang, size });
}
