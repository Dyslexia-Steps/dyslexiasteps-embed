import type { ReactElement } from "react";
export function Game(props: {
  game: "listen" | "build" | "choice" | "dictation";
  /** English: the list id (short-a, digraphs-sh, …). Other languages: the list page name (palabras-con-m, …). */
  list: string;
  lang?: "en" | "de" | "es" | "fr" | "nl" | "pt-br";
  size?: "compact" | "standard" | "wide";
}): ReactElement;
