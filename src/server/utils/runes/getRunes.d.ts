import type { RunePage as _RunePage } from "~/models/Rune";
export type RunePage = Omit<_RunePage, "id">;
export type RunePageDict = Record<number, RunePage>;
export type _RunePage = _RunePage;
